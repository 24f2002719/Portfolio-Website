class ModernCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);
        
        this.cursorinner = document.createElement('div');
        this.cursorinner.className = 'cursor2';
        document.body.appendChild(this.cursorinner);

        this.init();
    }

    init() {
        document.addEventListener('mousemove', e => {
            this.cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            this.cursorinner.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
            this.cursorinner.classList.add('cursorinnerhover');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
            this.cursorinner.classList.remove('cursorinnerhover');
        });
    }
}

new ModernCursor();