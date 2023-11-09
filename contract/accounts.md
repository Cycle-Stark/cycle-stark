# Account deployment procedure

First create a folder where you want to hold the accounts

```sh
mkdir accounts
```

Create a keystore from an already deployed account to help sign thet transactions

```sh
starkli signer keystore from-key ./accounts/account1_keystore.json
```

Export the keystore so that it can be used to sign transactions

```sh
export STARKNET_KEYSTORE=./accounts/account1_keystore.json
```

Deploy an account

```sh
starkli account deploy 
```