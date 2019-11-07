import * as Yup from 'yup';
import Moment from 'moment';

/* eslint func-names: 0 */
/**
 * @function Yup.mixed.validDate
 */
Yup.addMethod(Yup.mixed, 'validDate', function (message) {
    /**
     * @name Yup.mixed.validDate
     */
    return this.test('validDate', message, function (value) {
        const { path, createError } = this;

        if (value === undefined || value === null || value === '') {
            return true;
        }

        const new_date = new Date(value);

        if (new_date instanceof Date && isNaN(new_date)) {
            return createError({
                path,
                message,
            });
        }

        return true;
    });
});

/**
 * @function Yup.mixed.validMoment
 */
Yup.addMethod(Yup.mixed, 'validMoment', function (message) {
    /**
     * @name Yup.mixed.validMoment
     */
    return this.test('validMoment', message, function (value) {
        const { path, createError } = this;

        if (value === undefined || value === null || value === '') {
            return true;
        }

        const newValue = Moment(value);

        return newValue.isValid() ? true : createError({
            path,
            message,
        });
    });
});
