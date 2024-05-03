import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addCart: (state, action) => {
            // action.payload là một mảng các sản phẩm
            // thay thế state hiện tại bằng mảng này
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            // Tìm vị trí đầu tiên của sản phẩm có id và size cụ thể trong state
            const index = state.findIndex((product) => product.product_id === action.payload.product_id
                && product.product_current_size === action.payload.product_current_size);

            // Nếu tìm thấy sản phẩm, xóa nó khỏi state
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        emptyCart: (state) => {
            // Làm rỗng state
            return [];
        },
    },
});


const { actions, reducer } = cartSlice;
export const { addCart, removeFromCart, emptyCart } = actions;

export default reducer;