import BigNumber from "bignumber.js"
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { bnCompare, bigintToShortStr, bigintToLongStrAddress, getRealPrice } from "../configs/utils"
import { useAppContext } from "./AppProvider"
import { CairoCustomEnum } from "starknet"
import TOKENS from "../configs/tokens"

const initialData = {
    raw_collective: null as any,
    collective: null as any,
    isCollectiveLoading: false,
    isCollectiveFound: false,
    heroes: null as any,
    isMember: false,
    isOwner: false,
    loadingHeroes: false,
    tokenPrice: null as any,
}

export const CollectiveContext = createContext(initialData)

export const useCollectiveContext = () => {
    return useContext(CollectiveContext)
}


interface ICollectiveProvider {
    children: ReactNode
}

const CollectiveProvider = (props: ICollectiveProvider) => {
    const { children } = props
    const [rawCollective, setrawCollective] = useState<null | any>()
    const [collective, setCollective] = useState<null | any>()
    const [heroes, setHeroes] = useState<null | any>([])
    const [isCollectiveFound, setIsCollectiveFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingHeroes, setLoadingHeroes] = useState(false)
    const [isMember, setIsMember] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [tokenPrice, setTokenPrice] = useState<null | any>(null)
    const { cid } = useParams()
    const { contract, address, pragma_contract } = useAppContext()


    async function loadCollective() {
        setLoading(true)
        try {
            if (contract) {
                const res = await contract.get_stark_collective(cid)
                const res_ = structuredClone(res)
                let isFound = bnCompare(res?.id, cid?.toString())
                if (isFound) {
                    setIsCollectiveFound(isFound)
                    setrawCollective(res_)
                    res.id = BigNumber(res.id).toString()
                    res.name = bigintToShortStr(res.name)
                    res.owner = bigintToLongStrAddress(res?.owner?.toString())
                    res.aim = bigintToShortStr(res.aim)
                    res.token = bigintToLongStrAddress(res?.token?.toString())
                    res.symbol = bigintToShortStr(res.symbol)
                    let decimals = BigNumber(res.decimals)
                    res.decimals = decimals.toString()
                    res.cycle_amount = BigNumber(res.cycle_amount).dividedBy(10 ** decimals.toNumber()).toString()
                    res.fine = BigNumber(res.fine).dividedBy(10 ** decimals.toNumber()).toString()
                    res.hero_count = BigNumber(res.hero_count).toString()
                    res.cycles_count = BigNumber(res.cycles_count).toString()
                    res.active_cycle = BigNumber(res.active_cycle).toString()
                    res.rule_1 = bigintToShortStr(res.rule_1)
                    res.rule_2 = bigintToShortStr(res.rule_2)
                    res.rule_3 = bigintToShortStr(res.rule_3)
                    setCollective(res)
                    if (res.owner === address) {
                        setIsOwner(true)
                    }
                }
            }
        }
        catch (error: any) {
            console.error("Error loading collective::- ", error)
        }
        setLoading(false)
    }

    async function loadHeroes() {
        setLoadingHeroes(true)
        if (contract) {
            const res = await contract.get_collective_heroes(cid)
            setHeroes(res)
            checkIfMember(res)
            setLoadingHeroes(false)
        }
        setLoadingHeroes(false)
    }

    const getTokenPrice = async () => {
        if (pragma_contract && collective) {
            const pair: any = TOKENS.find(asset => asset.address.toLowerCase() === collective?.token.toLowerCase())
            if (pair) {
                const SPOTENTRY_ENUM = new CairoCustomEnum({
                    SpotEntry: pair.pair_id
                })
                const res = await pragma_contract.get_data_median(SPOTENTRY_ENUM)
                const price = getRealPrice(res)
                setTokenPrice(price?.price)
            }
        }
    }

    function checkIfMember(heroes_: any) {
        let member_state = heroes_?.some((address_: any) => bigintToLongStrAddress(address_?.toString()) === address);
        setIsMember(member_state)
    }

    const contextValue = useMemo(() => ({
        raw_collective: rawCollective,
        collective,
        isCollectiveLoading: loading,
        isCollectiveFound,
        heroes,
        isMember,
        loadingHeroes,
        isOwner,
        tokenPrice
    }), [collective, contract, tokenPrice]);

    useEffect(() => {
        loadCollective()
        loadHeroes()
    }, [cid, contract, address])

    useEffect(() => {
        getTokenPrice()
    }, [collective, cid])

    return (
        <CollectiveContext.Provider value={contextValue}>
            {children}
        </CollectiveContext.Provider>
    )
}

export default CollectiveProvider