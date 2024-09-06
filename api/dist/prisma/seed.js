"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.emRole.createMany({
            data: [
                { roleName: 'Admin' },
                { roleName: 'User' },
            ],
        });
        yield prisma.emCountry.createMany({
            data: [
                { countryName: 'India' },
                { countryName: 'Pakistan' },
            ],
        });
        yield prisma.emState.createMany({
            data: [
                { stateName: 'Haryana', countryId: 1 },
                { stateName: 'Punjab', countryId: 1 },
                { stateName: 'Lahore', countryId: 2 },
            ],
        });
        yield prisma.emCities.createMany({
            data: [
                { cityName: 'Yamunanagar', stateId: 1 },
                { cityName: 'Ludhiana', stateId: 2 },
                { cityName: 'Jaipur', stateId: 3 },
            ],
        });
        yield prisma.emUser.createMany({
            data: [
                {
                    userFirstName: 'Jatin',
                    userLastName: 'Sharma',
                    userEmail: 'jatin@gmail.com',
                    userPhone: '1234567890',
                    userCity: 'Yamunanagar',
                    userState: 'Haryana',
                    userCountry: 'India',
                    userPassword: 'Test@gmail.com',
                    userGender: 'Male',
                    userRoleId: 1,
                },
                {
                    userFirstName: 'Satyam',
                    userLastName: 'Garg',
                    userEmail: 'satyam@gmail.com',
                    userPhone: '0987654321',
                    userCity: 'Lahore',
                    userState: 'Lahore',
                    userCountry: 'Pakistan',
                    userPassword: 'satyam@123',
                    userGender: 'Male',
                    userRoleId: 2,
                },
            ],
        });
        console.log('Seeding completed!');
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
