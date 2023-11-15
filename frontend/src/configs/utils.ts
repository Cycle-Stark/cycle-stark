import { shortString } from "starknet"
import { BigNumber } from "bignumber.js"


export function isDarkMode(colorscheme: any): boolean {
    return colorscheme === 'dark' ? true : false
}

export function limitChars(str: string, count: number, show_dots: boolean) {
    if (count <= str.length) {
        return `${str.substring(0, count)} ${show_dots ? '...' : ''}`
    }
    return str
}

export function bigintToShortStr(bigintstr: string) {
    if (!bigintstr) return ""
    const bn = BigNumber(bigintstr)
    const hex_sentence = `0x` + bn.toString(16)

    return shortString.decodeShortString(hex_sentence)
}

export function convertToReadableTokens(tokens: any, decimals: number) {
    if (!tokens || !decimals) return ""
    return new BigNumber(tokens).dividedBy(10 ** decimals).toNumber().toFixed(4)
}

export function bigintToLongStrAddress(bigintstr: string) {
    if (!bigintstr) return ""
    const bn = BigNumber(bigintstr)
    const hex_sentence = `0x` + bn.toString(16)
    return hex_sentence;
}

export function bnCompare(bn: any, b: any) {
    return BigNumber(bn).toString() === b
}

export function timeStampToDate(timestamp: number) {
    if(!timestamp) return null
    const timestampInMilliseconds = timestamp * 1000;
    const date = new Date(timestampInMilliseconds);
    return date;
}


export function getTwoAddressLetters(address: string){
    return  address.substring(0, 4).substring(2, 4)
}