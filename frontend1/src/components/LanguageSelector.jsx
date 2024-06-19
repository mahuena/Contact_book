import {CiGlobe} from "react-icons/ci";
import {Menu, MenuButton, MenuList, MenuItem, Button} from "@chakra-ui/react";
import {useTranslation} from "react-i18next";

const languages = [
    {code: 'en', lang: 'English'},
    {code: 'fr', lang: 'French'},
];

export const LanguageSelector = () => {
    // const changeLanguage = (lng) => {
    //
    // };
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>

            <Menu>
                <MenuButton as={Button} leftIcon={<CiGlobe size={20}/>}>
                    Language
                </MenuButton>
                <MenuList >
                    {languages.map((lng) => (
                        <MenuItem key={lng.code} onClick={() => changeLanguage(lng.code)}>
                            {lng.lang}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </div>
    )
}