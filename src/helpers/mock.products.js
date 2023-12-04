import { faker } from "@faker-js/faker";

export const generateMockProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        code: faker.string.alphanumeric(5),
        category:faker.commerce.productMaterial(),
        stock: faker.number.int(1000),
        thumbnails:faker.image.url(),
    }
};



export const generateMock100Products = ()=>{
   
}

