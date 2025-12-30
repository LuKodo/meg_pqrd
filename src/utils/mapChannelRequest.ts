export const mapChannelRequest = (channel: string) => {
    switch (channel) {
        case 'MEG':
            return 'MEG';
        case 'PQRS':
            return 'PQRS';
        case 'TRAD':
            return 'Tradicional';
    }
}

export const mapColorChannelRequest = (channel: string) => {
    switch (channel) {
        case 'MEG':
            return 'warning';
        case 'PQRS':
            return 'info';
        case 'TRAD':
            return 'danger';
    }
}