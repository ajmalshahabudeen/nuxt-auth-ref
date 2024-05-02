import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const Email = body.Email
  const Password = body.Password
  const ConfirmPassword = body.ConfirmPassword
  const Username = body.UserName

  if (Password !== ConfirmPassword) {
    return ({
      statusCode: 400,
      statusMessage: "Passwords do not match"
    })
  }
  
  // console.log("Email: ", Email, "Password: ", Password, "ConfirmPassword: ", ConfirmPassword, "Username: ", Username)

  const hashedPassword = bcrypt.hashSync(Password, 10)

  try{
    const userExist = await prisma.user.findUnique({
      where: {
        email: Email
      }
    })
    if(userExist){
      return ({
        statusCode: 409,
        statusMessage: "User already exists"
      })
    } else {
      try{
        await prisma.user.create({
          data: {
            name: Username,
            email: Email,
            password: hashedPassword,
          }
        })
        return ({
          statusCode: 200,
          statusMessage: "Success"
        })
      }
      catch(error) {
        console.log(error)
        return ({
          statusCode: 500,
          statusMessage: "Internal Server Error"
        })
      }
    }
  }
  catch(error) {
    console.log(error)
    return ({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    })
  }
})
