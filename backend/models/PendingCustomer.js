import mongoose from "mongoose";

const pendingCustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: { 
            type: String, 
            required: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        otpHash: { 
            type: String, 
            required: true 
        },
        expiresAt: { 
            type: Date, 
            required: true 
        },
        attempts: { 
            type: Number, 
            default: 0 
        },
    },
    { 
        timestamps: true 
    }
);

pendingCustomerSchema.index(
    { 
        expiresAt: 1 //assencing order e date index crrearete korbo . like as : 2023-08-30T12:34:56.789Z
    },
    { 
        expireAfterSeconds: 0 
    }
);

const PendingCustomer = mongoose.model(
    "PendingCustomer",
    pendingCustomerSchema
);

export default PendingCustomer;