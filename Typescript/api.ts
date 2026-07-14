//API response

interface APIResponse<T> {
    success: boolean;
    data: T; //array, object
}

//USER DATA TYPE

type User = {
    fullName: string;
    email: string;
    password?: string;
}

//TODO: add product type

//API Response
const userResponse: APIResponse<User> = {
    success: false,
    data: {
        fullName: "Aayush",
        email: "aayush@gmail.com",
        password: "aayush13445"
    }
}

//TODO: product api response 

console.log(userResponse.data)
console.log(userResponse.data.fullName)
console.log(userResponse.success)