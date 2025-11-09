import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './pages/blog/blog.slice'
import { blogApi } from './pages/blog/blog.service'
import { setupListeners } from '@reduxjs/toolkit/query'
// ...

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    // ban cầu là tên. cái thứ 2 chính là cái hàm reducer đã được trích xuất
    [blogApi.reducerPath] : blogApi.reducer //Thêm reducer được tạo từ api slice
  },
  // Thêm api middleware để enable các tính năng như caching, invalidation, polling của rtk-query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

// Optional, những bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch