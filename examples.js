const stablecoinFarmAbi = require("./abi/stablecoinFarm.json");
const abi = require("./abi/ERC20Abi.json");

class StablecoinFarm {
    provider; // user provider
    signer; // user signer


    /**
	 * Before depositing, users need to approve spending his tokens
	 * @param farmAddress Stablecoin farm address that user wants to deposit into
	 */
	async approveStablecoinFarm(farmAddress) {
		const stablecoinFarm = new ethers.Contract(farmAddress, stablecoinFarmAbi, this.signer);
		const tokenAddress = await stablecoinFarm.token();
		await this.approveToken(tokenAddress, farmAddress);
	}

	/**
	 * @param farmAddress Stablecoin farm address that user wants to deposit into
	 */
	async isStablecoinFarmApproved(farmAddress) {
		const stablecoinFarm = new ethers.Contract(farmAddress, stablecoinFarmAbi, this.signer);
		const tokenAddress = await stablecoinFarm.token();
		return await this.isTokenApproved(1e15, tokenAddress, farmAddress);
	}

	/**
	 * @param farmAddress Stablecoin farm address that user wants to deposit into
	 * @param amount How much user wants to deposit
	 */
	async stablecoinFarmDeposit(farmAddress, amount) {
        const stablecoinFarm = new ethers.Contract(farmAddress, stablecoinFarmAbi, this.signer);
        const tokenAddress = await stablecoinFarm.token();
        const token = new ethers.Contract(tokenAddress, ERC20Abi, this.signer);
        const decimals = await token.decimals();
        const parsedAmount = ethers.utils.parseUnits(amount.toFixed(decimals), decimals);
        const tx = await stablecoinFarm.deposit(parsedAmount, /* YOUR REFERRAL ID*/);
        await tx.wait();
	}

	/**
	 * @param farmAddress Stablecoin farm address that user wants to withdraw from
	 * @param amount How much user wants to witdraw
	 */
	async stablecoinFarmWithdraw(farmAddress, amount) {
        const stablecoinFarm = new ethers.Contract(farmAddress, stablecoinFarmAbi, this.signer);
        const tokenAddress = await stablecoinFarm.token();
        const token = new ethers.Contract(tokenAddress, ERC20Abi, this.signer);
        const decimals = await token.decimals();

        const parsedAmount = ethers.utils.parseUnits(amount.toFixed(decimals), decimals);
        const tx = await stablecoinFarm.withdraw(parsedAmount);
        await tx.wait();
	}

    async isTokenApproved(amount, tokenAddress, spender) {
		const connectedWallet = await this.getAddress();
		const tokenContract = new ethers.Contract(tokenAddress, ERC20Abi, this.provider);
		const decimals = await tokenContract.decimals();
		const allowance = await tokenContract.allowance(connectedWallet, spender);

		const allowanceConverted = Number(ethers.utils.formatUnits(allowance.toString(), decimals));
		return allowanceConverted >= amount;
	}

	async approveToken(tokenAddress, spender) {
        const approveAmount = 1e20;

        const tokenContract = new ethers.Contract(tokenAddress, ERC20Abi, this.signer);
        const decimals = await tokenContract.decimals();

        const tx = await tokenContract.approve(spender, ethers.utils.parseUnits(approveAmount.toString(), decimals));
        await tx.wait();
	}

    async getAddress() {
        // return user connected wallet address
    }
}