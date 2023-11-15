import BigNumber from "bignumber.js"
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { contract } from "../configs/config"
import { bnCompare, bigintToShortStr, bigintToLongStrAddress } from "../configs/utils"

const initialData = {
    raw_collective: null as any,
    collective: null as any,
    isCollectiveLoading: false,
    isCollectiveFound: false
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
    const [isCollectiveFound, setIsCollectiveFound] = useState(false)
    const [loading, setLoading] = useState(false)
    const { cid } = useParams()

    async function loadCollective() {
        setLoading(true)
        try {
            const res = await contract.get_stark_collective(cid)
            let isFound = bnCompare(res?.id, cid?.toString())
            if (isFound) {
                setIsCollectiveFound(isFound)
                setrawCollective(res)
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
            }
        }
        catch (error: any) {
            console.error("Error loading collective::- ", error)
        }
        setLoading(false)
    }

    const contextValue = useMemo(() => ({
        raw_collective: rawCollective,
        collective,
        isCollectiveLoading: loading,
        isCollectiveFound
    }), [collective]);

    useEffect(() => {
        loadCollective()
    }, [cid])

    return (
        <CollectiveContext.Provider value={contextValue}>
            {children}
        </CollectiveContext.Provider>
    )
}

export default CollectiveProvider