import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoLogin = () => {

    const navi = useNavigate();

    useEffect(() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API;
        const REDIRECT_URI ='http://localhost:3000/kakao-login';

    axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
    )
    .then((res) => {
        console.log(res);
        const { access_token } = res.data;
        axios.post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                }
            }
        )
        .then((res) => {
            axios.post('http://localhost:9090/member/join', {
                username: res.data.kakao_account.email,
                password: res.data.id
            })
            .then(() => {
                axios.post('http://localhost:9090/member/login', {
                    username: res.data.kakao_account.email,
                    password: res.data.id
                })
                .then((response2) => {
                    if (response2.data.item && response2.data.statusCode === 200) {
                        sessionStorage.setItem('ACCESS_TOKEN', response2.data.item.token);
                        sessionStorage.getItem('ACCESS_TOKEN');
                        navi('/');
                        window.location.reload();
                    }
                })
            })
            .catch((e) => {
                axios.post('http://localhost:9090/member/login', {
                    username: res.data.kakao_account.email,
                    password: res.data.id
                })
                .then((response2) => {
                    if (response2.data.item && response2.data.statusCode === 200) {
                        sessionStorage.setItem('ACCESS_TOKEN', response2.data.item.token);
                        sessionStorage.getItem('ACCESS_TOKEN');
                        navi('/');
                    }
                })
                .catch((e) => {
                    if (e.response && e.response.data.errorCode === 102) {
                        alert('알 수 없는 에러 발생. 관리자에게 문의하세요.');
                        return;
                    }
                    console.error(e);
                });
            });
        })
        .catch((e) => {
            console.error(e);
        });
    })
    .catch((e) => {
        console.error(e);
    });
}, [])

return (
    <div>
       Loading...
    </div>
);

}

export default KakaoLogin