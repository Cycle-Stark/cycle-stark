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
    return new BigNumber(tokens).dividedBy(10 ** decimals).toNumber().toFixed(6)
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
    if (!timestamp) return null
    const timestampInMilliseconds = timestamp * 1000;
    const date = new Date(timestampInMilliseconds);
    return date;
}


export function getTwoAddressLetters(address: string) {
    if (!address) return "0x"
    return address?.substring(0, 4).substring(2, 4) ?? "0x"
}

export const encoder = (str: string) => {
    return shortString.encodeShortString(str);
}

export function getRealPrice(val: any) {
    let decimals = BigNumber(val.decimals).toNumber()
    let ts = BigNumber(val.last_updated_timestamp).toNumber()
    let real_price = {
        price: BigNumber(val.price).dividedBy(10 ** decimals).toNumber(),
        last_updated_timestamp: timeStampToDate(ts),
        num_sources_aggregated: BigNumber(val.num_sources_aggregated).toNumber()
    }
    return real_price
}

export function formatNumberInternational(number: number) {
    // Check if the Intl.NumberFormat is supported in the browser
    const DECIMALS = 4
    if (typeof Intl.NumberFormat === 'function') {
        // Format the number using the "en-US" locale
        const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: DECIMALS, maximumFractionDigits: DECIMALS});
        return formatter.format(number);
    } else {
        // Fallback for browsers that do not support Intl.NumberFormat
        console.warn('Intl.NumberFormat is not supported in this browser. Fallback may not provide accurate formatting.');
        // You can implement a custom fallback logic here if needed
        return number.toLocaleString('en-US');
    }
}