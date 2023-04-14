import { prefixPluginTranslations } from '@strapi/helper-plugin'
import pluginId from './pluginId'
import PluginIcon from './components/PluginIcon'
import getTrad from './utils/getTrad'
import * as yup from "yup";

export default {
  register(app) {
    app.customFields.register({
      name: 'custom-components',
      pluginId: 'custom-components',
      type: 'json',
      icon: PluginIcon,
      intlLabel: {
        id: getTrad('custom-components.label'),
        defaultMessage: 'Custom components',
      },
      intlDescription: {
        id: getTrad('custom-components.description'),
        defaultMessage: 'Add custom components to the content manager',
      },
      components: {
        Input: async () => import('./components'),
      },
      options: {
        base: [
          {
            sectionTitle: null,
            items: [
              {
                name: 'options.type',
                type: 'select',
                required: true,
                options: [
                  { value: 'Brand Images', key: "option.a", metadatas: {intlLabel: {id: "option.a", defaultMessage: "Image brands block", }} },
                  { value: 'Simple CTA', key: "option.b", metadatas: {intlLabel: {id: "option.b", defaultMessage: "Simple CTA", },} },
                ],
                intlLabel: {
                  id: getTrad('custom-components.enum.label'),
                  defaultMessage: 'Component',
                },
                description: {
                  id: getTrad('custom-components.enum.description'),
                  defaultMessage:
                    'Select the custom component to render',
                },
                placeholder: {
                  id: getTrad('custom-components.enum.placeholder'),
                  defaultMessage: 'Select a component',
                },
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'form.attribute.item.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'form.attribute.item.requiredField.description',
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
        validator: (args) => ({
          type: yup.string().required({
            id: "options.type.error.required",
            defaultMessage: "Component selection is required",
          }),
        }),
      },
    })
  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return Promise.all([import(`./translations/${locale}.json`)])
          .then(([pluginTranslations]) => {
            return {
              data: {
                ...prefixPluginTranslations(
                  pluginTranslations.default,
                  pluginId,
                ),
              },
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      }),
    )
    return Promise.resolve(importedTrads)
  },
}
