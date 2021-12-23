export const store = {
    state: {
        loading: false
    },
    showLoading() {
        this.state.loading = true;
    },
    hideLoading() {
        this.state.loading = false;
    }
}