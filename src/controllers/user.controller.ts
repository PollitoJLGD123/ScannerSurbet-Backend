import { Request, Response } from 'express';

class UserController {
  me = (req: Request, res: Response) => {
    const user = (req as any).user;
    res.status(200).json({
      success: true,
      data: user
    });
  }
}

export default new UserController();