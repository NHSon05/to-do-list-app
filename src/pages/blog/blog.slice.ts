import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
    postId: string;
}
// Biến chứa state đầu
const initialState: BlogState = {
    postId: ''   
}

// tạo slice
// nhận vào 1 object cấu hình và tự động làm 3 việc
// 1. tạo ra các hàm reducer
// 2. tạo ra các action creators
// 3. kết hợp chúng lại
const blogSlice = createSlice({
    name: 'blog',
    // RTK dùng tên này để tự động tạo ra tên cho các actions
    initialState: initialState,
    reducers: {
        startEditPost: (state, action: PayloadAction<string>) => {
            state.postId = action.payload
        },
        cacnelEditPost: (state) => {
            state.postId = ''
        }
    }
    // nơi định nghĩa các action để thay đổi state
})

const blogReducer = blogSlice.reducer
// trích xuất ra các reducer. Vì blogSlice trả về 1 object và ta chỉ muốn trích xuất ra các hàm reducer
export const {cacnelEditPost, startEditPost } = blogSlice.actions

export default blogReducer;