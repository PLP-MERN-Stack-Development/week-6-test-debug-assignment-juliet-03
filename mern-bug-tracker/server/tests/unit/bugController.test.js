const Bug = require('../../src/models/bugModel');
const {
  createBug,
  getBugs,
  updateBug,
  deleteBug
} = require('../../src/controllers/bugController');

jest.mock('../../src/models/bugModel');

const mockReqRes = (body = {}, params = {}) => {
  const req = { body, params };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  return { req, res, next };
};

describe('Bug Controller', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
const createBug = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newBug = await Bug.create({
      title,
      description,
      status: 'open', // ✅ ensure this is set
    });

    res.status(201).json(newBug);
  } catch (err) {
    next(err);
  }
};

  test('getBugs should return list of bugs', async () => {
    const bugs = [{ title: 'Bug1' }, { title: 'Bug2' }];
    Bug.find.mockResolvedValue(bugs);

    const { req, res, next } = mockReqRes();

    await getBugs(req, res, next);

    expect(Bug.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(bugs);
  });

  test('updateBug should return updated bug', async () => {
    const bugId = 'abc123';
    const updateData = { status: 'resolved' };
    const updatedBug = { _id: bugId, ...updateData };

    Bug.findByIdAndUpdate.mockResolvedValue(updatedBug);

    const { req, res, next } = mockReqRes(updateData, { id: bugId });

    await updateBug(req, res, next);

    expect(Bug.findByIdAndUpdate).toHaveBeenCalledWith(
      bugId,
      updateData,
      { new: true }
    );
    expect(res.json).toHaveBeenCalledWith(updatedBug);
  });

  test('deleteBug should confirm deletion', async () => {
    const bugId = 'xyz456';

    Bug.findByIdAndDelete.mockResolvedValue({ _id: bugId });

    const { req, res, next } = mockReqRes({}, { id: bugId });

    await deleteBug(req, res, next);

    expect(Bug.findByIdAndDelete).toHaveBeenCalledWith(bugId);
    expect(res.json).toHaveBeenCalledWith({ message: 'Bug deleted' });
  });
});