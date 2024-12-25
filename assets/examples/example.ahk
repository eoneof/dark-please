class DarkPlease {
    __New() {
        this.setIcon()
    }

    setIcon() {
        iconPath := 'img\icons\icon.png'

        try {
            TraySetIcon(iconPath)
        } catch as e {
            OutputDebug(e)
        }
    }

    /**
     * @param {string} itemName
     * @param {Object: { property: String } } options
     */
    setMenu(itemName, options) {
        if (!itemName && !options) {
            return
        }
    }
}

global theme := DarkPlease()
