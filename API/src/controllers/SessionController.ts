import { Request, Response } from 'express';
import SessionService from "../services/SessionService";

class SessionController {

  async createSession(request: Request, response: Response) {
    try {
      const { email, password } = request.body;

      const sessionService = new SessionService();

      const { user, token } = await sessionService.execute({ email, password });

      //delete user.password;

      return response.json({ user, token });
    } catch (err) {

      return response.status(400).json({
        error: err.message
      });
    }
  }
}

export default SessionController;
