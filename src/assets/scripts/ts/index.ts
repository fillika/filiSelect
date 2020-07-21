class Select {
  $el: HTMLElement | null;
  $input: HTMLElement;
  readonly name: string;
  private selectedId: string | null | undefined | number;
  options: {
    placeholder?: string,
    data?: [],
    selectedId?: number
  };

  constructor(selector: string, options: {}) {
    this.$el = document.querySelector(selector);
    this.$input = document.createElement('div');
    this.options = options;
    this.selectedId = null;
    this.name = Select.createName(selector);

    window[this.name] = this;

    this.init();
  }

  private init(): void {
    this.render();
    this.setup();
  }

  private static createName(selector: string) {
    const prefix = 'fili';
    const pureName = selector.slice(1);
    return prefix + pureName.charAt(0).toUpperCase() + pureName.slice(1);
  }

  private render() {
    const { placeholder, data, selectedId } = this.options;
    const dropdown: HTMLElement = document.createElement('div');
    const list: HTMLElement = document.createElement('ul');

    this.$input.classList.add('select__input');
    this.$input.dataset.selectType = 'input';

    if (selectedId) {
      data?.forEach((item: { value?: any, id?: any }) => {
        if (selectedId === item.id) {
          this.$input.textContent = item.value;
        }
      });
    } else {
      this.$input.textContent = placeholder ?? 'Нажмите, чтобы выбрать...';
    }

    dropdown.classList.add('select__dropdown');
    list.classList.add('select__list');
    dropdown.appendChild(list);

    createList(data);

    this.$el?.classList.add('select');
    this.$el?.appendChild(this.$input);
    this.$el?.appendChild(dropdown);

    /**
     * Функция создания выпадающего списка. Внутри проверка на selectedId
     * @param {array} data = массив с данными, по умолчанию пустой массив
     */
    function createList(data: [] = []): void {
      data?.forEach((obj: { value?: string | undefined, id?: any }) => {
        const li: HTMLElement = document.createElement('li');
        li.classList.add('select__list-item');
        li.dataset.selectType = 'list-item';
        li.dataset.value = obj.value;
        li.dataset.id = obj.id;
        li.textContent = obj.value ?? '';

        if (selectedId === obj.id) {
          li.classList.add('selected');
        }

        list.appendChild(li);
      });
    }
  }

  private setup() {
    this.cliclHandler = this.cliclHandler.bind(this); // Чтобы не потерять контекст
    this.$el?.addEventListener('click', this.cliclHandler);
  }

  private cliclHandler(event: Event) {
    if (event.target instanceof HTMLElement) {
      const { selectType, id } = event.target.dataset;

      if (selectType === 'input') {
        this.$el?.classList.toggle('open');
      } else if (selectType === 'list-item') {
        this.select(id);
        this.close();

        this.$el?.querySelectorAll('[data-select-type="list-item"]')
          .forEach(item => item.classList.remove('selected'));
        event.target.classList.add('selected');
      }
    }
  }

  public open() {
    this.$el?.classList.add('open');
  }

  public close() {
    this.$el?.classList.remove('open');
  }

  public select(id: string | undefined) {
    const { data } = this.options;
    this.selectedId = id;

    data?.forEach((obj: { value?: string | undefined, id?: any }) => {
      if (this.selectedId == obj.id) {
        this.$input.textContent = obj.value ?? '';
      }
    });
  }

  public destroy() {
    this.$el?.removeEventListener('click', this.cliclHandler);
    this.$el?.parentNode?.removeChild(this.$el);
  }
}

const options = {
  placeholder: 'Выберите свой путь...',
  selectedId: 2,
  data: [
    {
      id: 1,
      value: 'React',
    },
    {
      id: 2,
      value: 'Angular',
    },
    {
      id: 3,
      value: 'Vue',
    },
    {
      id: 4,
      value: 'Next',
    },
    {
      id: 5,
      value: 'Nest',
    },
    {
      id: 6,
      value: 'Jest',
    },
  ],
};

const select = new Select('#select', options);
