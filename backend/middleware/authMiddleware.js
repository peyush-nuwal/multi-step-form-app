import jwt from 'jsonwebtoken'

const authMiddleware=(req,res,next)=>{
    const authHeader= req.headers.authorization

    if(!authHeader ||!authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:"Authorizaton token missing or invalid"})
    }

    const token=authHeader.split(' ')[1] //spliting the by space berer" "<token>

    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET)

        req.user= {
            id:decoded.id,
            email:decoded.email

        }

        next()
        
    } catch (error) {
        return res.send(401).json({message:"Invalid/expried token"})
    }

}
export default authMiddleware