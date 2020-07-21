class Select {
  $el: HTMLElement | null;
  readonly name: string;

  constructor(selector: string, options: {}) {
    this.$el = document.querySelector(selector);
    this.name = this.createName(selector);

    window[this.name] = this;

    this.init();
  }

  init(): void {
    this.render();

    if (this.$el) {
      console.log(this.name);
    }
  }

  createName(selector: string) {
    const prefix = 'fili';
    const pureName = selector.slice(1);
    return prefix + pureName.charAt(0).toUpperCase() + pureName.slice(1);
  }

  private render() {
    const input: HTMLElement = document.createElement('div');
    const dropdown: HTMLElement = document.createElement('div');
    const list: HTMLElement = document.createElement('ul');
    const li: HTMLElement = document.createElement('li');

    input.classList.add('select__input');
    input.textContent = 'Выберите свой путь...';
    dropdown.classList.add('select__dropdown');
    list.classList.add('select__list');
    li.classList.add('select__list-item');
    li.textContent = 'У самурая нет цели - только путь';

    dropdown.appendChild(list);
    list.appendChild(li);

    this.$el?.classList.add('select');
    this.$el?.appendChild(input);
    this.$el?.appendChild(dropdown);
  }

  public open() {
    this.$el?.classList.add('open');
  }

  public close() {
    this.$el?.classList.remove('open');
  }
}

const select = new Select('#select', {});
