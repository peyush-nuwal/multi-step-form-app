
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
import bcrypt from 'bcryptjs'


const  JWT_SECRET = process.env.JWT_SECRET || "changemeInProduction"


const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
         if(!name) return res.status(400).json({error:"name is required "})
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign(
            { id: user.id,name:user.name, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email},  });

    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
};
  

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid password" });

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
       

        res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
};


export {signUp, login}