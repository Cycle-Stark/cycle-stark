


export function isDarkMode(colorscheme: any): boolean {
    return colorscheme === 'dark' ? true : false
}

export function limitChars(str: string, count: number, show_dots: boolean){
    if(count <= str.length){
        return `${str.substring(0, count)} ${show_dots ? '...' : ''}`
    }
    return str
}