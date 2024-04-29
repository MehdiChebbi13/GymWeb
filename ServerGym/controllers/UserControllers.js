import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

// LOGGING IN
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json("Invalid email ");
      }
  
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        return res.status(401).json("Invalid password");
      }
      delete user.password;
      console.log({user});
      res.status(200).send({ user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }});
    } catch (e) {
      res.status(500).send({ error: e.message });
    }
  };

// REGISTERING
export const register = async (req, res) => {
    try {
      const { firstName, lastName,gender, email, password, phoneNumber} = req.body;
      const user = await User.findOne({ email:email });
        if (user) {
            return res.status(401).json("User already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            gender,
            email,
            password: hashedPassword,
            phoneNumber,
        });
        const savedUser = await newUser.save();
        delete savedUser.password;
        res.status(200).send({ savedUser });
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
};