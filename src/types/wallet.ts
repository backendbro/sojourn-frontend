export type WalletType = {
  bankName: string;
  bankAccountNumber: string;
  hostId: string;
};

export type Withdraw = {
  walletId: string;
  hostId: string;
  amount: number;
  accountId: string;
  description: string;
};

export type BankAccount = {
  bankName: string;
  bankAccountNumber: string;
  hostId: string;
};
