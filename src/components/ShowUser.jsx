import { getAPI } from '@/utils/fetch';
import { useState } from 'react';

export default function ShowUser({user}) {

    return(
        <div>
            <h3>회원정보</h3>
            <div>
                <div>
                    {user}
                    <span>회원이름: {user}</span>
                    <span>전화번호: </span>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async(context) => {
    return {
        props: {
            user: await(await getAPI(`/api/user?id=${context}`)).data[0],
        },
    };
};