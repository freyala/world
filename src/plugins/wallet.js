import {mapGetters, mapActions} from 'vuex'
import {ethers} from 'ethers'

export default {
    computed: {
        ...mapGetters(['loggedIn', 'metaMaskAccount', 'walletConnected'])
    },
    methods: {
        ...mapActions(['setChainStatus', 'setChainId', 'setMetaMaskAccount', 'setUserLoggedIn', 'setMetaMaskWallet', 'setWalletConnectionStatus']),

        async connectWallet() {
            if (this.metaMaskAccount === true) {
                await this.disconnectWallet()
                return
            }

            if (window.ethereum !== undefined) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    await provider.send("eth_requestAccounts", [])
                    const signer = await provider.getSigner()
                    const network = await provider.getNetwork()

                    const accounts = await signer.getAddress()
                    this.setMetaMaskAccount(accounts)
                    this.setChainId(network.chainId)

                    if (network.chainId !== 1666600000) {
                        this.setChainStatus('wrong')
                        return
                    } else {
                        this.setChainStatus('correct')
                    }

                    this.setMetaMaskWallet({signer})
                    this.setUserLoggedIn(true)

                    if (this.loggedIn === true) {
                        this.setWalletConnectionStatus(!this.walletConnected)
                    }
                } catch {
                    return false
                }
            }
        },

        async disconnectWallet() {
            await this.setDefaultWallet()
            this.setUserLoggedIn(false)
            this.setWalletConnectionStatus(!this.walletConnected)
        },

        async setDefaultWallet() {
            if (!this.loggedIn) {
                this.setMetaMaskAccount(["0x0000000000000000000000000000000000000003"])
            }
        }
    }
}