export interface User {
    userId: number;
    fullNane: string;
    kanaName: string;
    birthDay: string;
    showFlag?: boolean; //Xử lí button edit ở list user (thêm ? để ko bắt buộc)
}