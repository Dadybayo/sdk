import { useTonConnectUI } from './useTonConnectUI';
import { Wallet, WalletInfo } from '@tonconnect/sdk';
import { useEffect, useState } from 'react';
import { isServerSide } from '../utils/web';

/**
 * Use it to get user's current ton wallet. If wallet is not connected hook will return null.
 */
export function useTonWallet(): (Wallet & WalletInfo) | null {
    if (isServerSide()) {
        return null;
    }

    const [tonConnectUI] = useTonConnectUI();
    const [wallet, setWallet] = useState<(Wallet & WalletInfo) | null>(
        () => tonConnectUI.wallet && { ...tonConnectUI.wallet, ...tonConnectUI.walletInfo! }
    );

    useEffect(
        () =>
            tonConnectUI.onStatusChange(value => {
                setWallet(value);
            }),
        [tonConnectUI]
    );

    return wallet;
}
