import { getLanguage } from "@/services/locale.service"

let lang = getLanguage();

let API_HOST = '';
if (process.env.VUE_APP_BASE_URL_API) {
    API_HOST = `${process.env.VUE_APP_BASE_URL_API}/${lang}`
}
else {
    API_HOST=`http://localhost:8000/${lang}`
}

const NETWORK_LIST = {
    'instagram': {
        'name': 'Instagram', 'icon': 'instagram.svg', 'link': 'https://instagram.com/'
    },
    'tiktok': {
        'name': 'TikTok', 'icon': 'tiktok.svg', 'link': 'https://tiktok.com/@'
    },
    'telegram': {
        'name': 'Telegram', 'icon': 'telegram.svg', 'link': 'https://t.me/'
    },
};

export { API_HOST, NETWORK_LIST };
export default {};
