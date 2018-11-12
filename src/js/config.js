//console.log(process.env.NODE_ENV);
export default {
    test: (process.env.NODE_ENV === 'debug'),
    formId: 'contactForm',
    messages: {
        required: 'Обязательное поле',
        email: 'Неверный формат e-mail',
        promokod: 'Промокод должен состоять из 9 символов',
        error: 'Ошибка заполнения формы',
        success: 'Ваш промокод успешно добавлен'
    },
    requiredFields: ['promokod', 'fio', 'phone', 'confirm1', 'confirm2', 'file1'],
    filesFields: ['file1'],
    initialValues: {
        promokod: '',
        fio: '',
        phone: '',
        email: '',
        file1: '',
        confirm1: true,
        confirm2: true
    },
    initialTestValues: {promokod: '000дмеяяг', fio: 'Иван Иванов', phone: '9107270742', email: 'a@a.ru', file1: '', confirm1: true, confirm2: true}
}