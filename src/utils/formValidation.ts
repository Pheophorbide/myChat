export const required = value => (value ? '' : 'Поле не может быть пустым!');

export const maxLength = value => value && value.length > 32 ? 'Имя не должно быть длиннее 32 символов!' : '';
export const maxMsgLength = value => value && value.length > 225 ? 'Сообщение слишком длинное!' : '';

