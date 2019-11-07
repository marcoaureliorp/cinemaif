import * as Yup from 'yup';
import Moment from 'moment';

/* eslint func-names: 0 */
/**
 * @function Yup.mixed.typeFile
 */
Yup.addMethod(Yup.mixed, 'typeFile', function (message) {
    /**
     * @name Yup.mixed.typeFile
     */
    return this.test('typeFile', message, function (value) {
        const { path, createError } = this;

        if (value === undefined || value === null || value === '') {
            return true;
        }

        if (!(value instanceof File)) {
            return createError({
                path,
                message,
            });
        }

        return true;
    });
});
