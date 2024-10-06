import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import CustomerRouter from "./modules/customers/customer.router.js"
import AccountBankRouter from "./modules/accountsBank/account.router.js"
import TrasactionRouter from "./modules/transactionBank/transaction.router.js" 
dotenv.config()

export const appMethods=(app,express)=>{
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(cors())
    app.use("/apis/customer",CustomerRouter)
    app.use("/apis/accountBank",AccountBankRouter)
    app.use("/apis/transaction",TrasactionRouter)
    app.get("/", (req, res, next) => {
        const temp = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Banking System Welcome</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f0f8ff;
                    text-align: center;
                }
    
                .welcome-message {
                    margin-top: 100px;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
    
                h1 {
                    font-size: 48px;
                    color: #2c3e50;
                }
    
                p {
                    color: #34495e;
                    font-size: 24px;
                    margin: 20px 0;
                }
    
                .bank-icons {
                    margin-top: 40px;
                }
    
                .bank-icons i {
                    font-size: 64px;
                    margin: 0 20px;
                    color: #2980b9;
                    border-radius: 50%;
                    padding: 20px;
                    background-color: #eaf4f4;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
    
                .bank-icons i:hover {
                    transform: scale(1.1);
                }
            </style>
        </head>
        <body>
            <div class="welcome-message">
                <h1>Welcome to Your Banking System!</h1>
                <p>Manage your accounts, transactions, and more with ease.</p>
                <div class="bank-icons">
                    <i class="fas fa-dollar-sign"></i>
                    <i class="fas fa-money-check-alt"></i>
                    <i class="fas fs-solid fa-landmark"></i>
                </div>
            </div>
        </body>
        </html>
        `;
        res.status(200).header('Content-Type', 'text/html').send(temp);
    });
    
    app.use((err, req, res, next) => {
        const status = err.status || 500;
        res.status(status).json({
            status: status,
            success: false,
            message: err.message || "Internal Server Error"
        });
    });
    //Not Found Page Router
app.all("*",(req, res, next)=>{
    return next(new Error("Not Found Page ! ",{causs:404}))
})
    const Port=process.env.port
app.listen(Port,()=>{
    console.log(`Server Is Running On Port ${Port}`);
})



}

