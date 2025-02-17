import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { startLoadingData } from '../store/account/thunks';
import { startLoadingDataReason } from '../store/reason/thunks';



export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            if ( !user ) return dispatch( logout() );
            const { uid, email, displayName, photoURL } = user;
            dispatch( login({ uid, email, displayName, photoURL }) );
            //*Accounts
            const resources = ["accounts", "accountTypes","vouchers"];
            resources.forEach((resource) => {
              dispatch(startLoadingData(resource));
            });
            const resourcesNomination = ["workers", "payroalls","reasons"];
            resourcesNomination.forEach((resourceNomination) => {
              dispatch(startLoadingDataReason(resourceNomination));
            });
        })
        
    }, []);

    return status;
}
