# DAO Maker Stablecoin Farms referral system
## create your referrer id
Call function `setReferrer` with these parameters:
- an arbitrary id 8-chars long
- your address receiving fees
- fee on user APR (max 30%, the base is 100%, not APR) 

Contact us if you want to receive some fees also from DAO Maker's fees (~1% APR fee)

## refer users
Call function `deposit` with these parameters:
- amount to deposit
- your referral id (8-char long string)

## withdraw your fees
Users are charged fees when they withdraw (can be also done manually by calling `chargeFees` function). Part of their shares is redistributed to your fee receiving wallet. To withdraw them, simply call `withdraw` function. 

## get user deposited amounts, TVL
### endpoint https://api.daomaker.com/stablecoin-farms
returns this object
```
{
    tvlTotal: "", //in $
	farms: [
		{
			address: "",
			tvl: "", //in $
			token: {
				image: "",
				name: "",
				address: ""
			}
		}
	]
}
```
### endpoint https://api.daomaker.com/stablecoin-farms-user?wallet="user wallet"
returns this object
```
{
	<farmAddress>: {
		deposit: "", // sum of deposited amounts
		maxWithdrawable: "", // how much can user withdraw in total
		yield: "", 
		depositFee: "" // very small percentage, represents how much of deposited amount will be withdrawable right after depositing
	}
}
```
## code examples
In this package there are included codes of deposit, withdraw and approve functions. You will probably need to modify it.