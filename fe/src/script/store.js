export const store = {
    state: {
        loading: false,
        user: {}
    },
    get mutate() {
        return {
            UPDATE_LOADING: (loading) => {
                this.state.loading = loading;
            },
            UPDATE_USER: (user) => {
                this.state.user = user;
            }
        }
    },
    get action() {
        return {
            showLoading: () => {
                this.mutate.UPDATE_LOADING(true);
            },
            hideLoading: () => {
                this.mutate.UPDATE_LOADING(false);
            },
            getHospitalList: async () => {
                let response = await fetch(`http://localhost:3000/api/hospital`, {
                    credentials: 'include'
                })
                let data = await response.json();
                return data;
            },
            getRoleList: async () => {
                let response = await fetch(`http://localhost:3000/api/role`, {
                    credentials: 'include'
                })
                let data = await response.json();
                return data;
            },
            getUser: async () => {
                let response = await fetch(`http://localhost:3000/api/staff/userInfo`, {
                    credentials: 'include'
                })
                let data = await response.json();
                if (data == false) {
                    this.mutate.UPDATE_USER({});
                    return false;
                } else {
                    this.mutate.UPDATE_USER(data);
                    return true;
                }
                
            }
        }
    },
    
}