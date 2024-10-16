import { useEffect, useState } from 'react'
import { CallData } from 'starknet';
import { useAppContext } from '../providers/AppProvider';

const Component = () => {
    const { account } = useAppContext()
    const [txhash, setTxHash] = useState(null)
    const [deployed, setDeployed] = useState(false)

    const deploy = async () => {

        const contractConstructor = CallData.compile({
            text: 'niceToken',
            longText: "http://addressOfMyERC721pictures/image1.jpg",
            array1: [0x1]
        });

        const result = await account.deployContract({
            classHash: '<contractClassHash?',
            constructorCalldata: contractConstructor
        });

        setTxHash(result?.transaction_hash)

    }

    const checkIfDeployed = () => {
        // Do the required logic here to check if the transaction has been completed
        setDeployed(true)
    }

    useEffect(() => {
        if(!deployed){
            setTimeout(() => {
                checkIfDeployed()
            }, 1000)
        }
    }, [txhash])

    return (
        <div>
            <button onClick={deploy}>Deploy</button>
        </div>
    )
}

export default Component