import appConfig from '../../app-config.json' with { type: 'json' };

const EXPECTED_EXPERIENCE_COUNT = 4;
const EXPECTED_BLOCKS_COUNT = 5;
const EXPECTED_CONTACTS_COUNT = 5;
const EXPECTED_ABOUT_ME_YEARS = 6;
const EXPECTED_ABOUT_ME_HOURS = 10;
const EXPECTED_ABOUT_ME_PROJECT_COUNT = 10;

describe('app-config.json validation', () => {
  describe('Structure validation', () => {
    it('should have required top-level properties', () => {
      expect(appConfig).toHaveProperty('aboutMe');
      expect(appConfig).toHaveProperty('myExperience');
      expect(appConfig).toHaveProperty('myStack');
      expect(appConfig).toHaveProperty('myContacts');
    });

    it('should not have additional top-level properties', () => {
      const expectedKeys = ['aboutMe', 'myExperience', 'myStack', 'myContacts'];
      const actualKeys = Object.keys(appConfig);
      expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      expect(actualKeys).toHaveLength(expectedKeys.length);
    });
  });

  describe('aboutMe section validation', () => {
    it('should have correct structure', () => {
      expect(appConfig.aboutMe).toHaveProperty('years');
      expect(appConfig.aboutMe).toHaveProperty('hours');
      expect(appConfig.aboutMe).toHaveProperty('projectCount');
    });

    it('should have correct data types', () => {
      expect(typeof appConfig.aboutMe.years).toBe('number');
      expect(typeof appConfig.aboutMe.hours).toBe('number');
      expect(typeof appConfig.aboutMe.projectCount).toBe('number');
    });

    it('should have positive values', () => {
      expect(appConfig.aboutMe.years).toBeGreaterThan(0);
      expect(appConfig.aboutMe.hours).toBeGreaterThan(0);
      expect(appConfig.aboutMe.projectCount).toBeGreaterThan(0);
    });

    it('should not have additional properties', () => {
      const expectedKeys = ['years', 'hours', 'projectCount'];
      const actualKeys = Object.keys(appConfig.aboutMe);
      expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      expect(actualKeys).toHaveLength(expectedKeys.length);
    });
  });

  describe('myExperience section validation', () => {
    it('should have correct structure', () => {
      expect(appConfig.myExperience).toHaveProperty('experience');
      expect(Array.isArray(appConfig.myExperience.experience)).toBe(true);
    });

    it('should not have additional properties', () => {
      const expectedKeys = ['experience'];
      const actualKeys = Object.keys(appConfig.myExperience);
      expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      expect(actualKeys).toHaveLength(expectedKeys.length);
    });

    describe('experience array validation', () => {
      it('should not be empty', () => {
        expect(appConfig.myExperience.experience).toHaveLength(
          EXPECTED_EXPERIENCE_COUNT
        );
      });

      it('should have valid experience items', () => {
        for (const item of appConfig.myExperience.experience) {
          expect(item).toHaveProperty('id');
          expect(item).toHaveProperty('company');
          expect(item).toHaveProperty('position');
          expect(item).toHaveProperty('startDate');
          expect(item).toHaveProperty('endDate');

          expect(typeof item.id).toBe('number');
          expect(typeof item.company).toBe('string');
          expect(typeof item.position).toBe('string');
          expect(typeof item.startDate).toBe('string');
          expect(
            item.endDate === null || typeof item.endDate === 'string'
          ).toBe(true);

          expect(item.id).toBeGreaterThan(0);
          expect(item.company.length).toBeGreaterThan(0);
          expect(item.position.length).toBeGreaterThan(0);
          expect(item.startDate.length).toBeGreaterThan(0);

          if (item.endDate !== null) {
            expect(item.endDate.length).toBeGreaterThan(0);
          }
        }
      });

      it('should have unique IDs', () => {
        const ids = appConfig.myExperience.experience.map((item) => item.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
      });

      it('should have valid date formats', () => {
        for (const item of appConfig.myExperience.experience) {
          const startDate = new Date(item.startDate);
          expect(startDate.getTime()).not.toBeNaN();

          if (item.endDate !== null) {
            const endDate = new Date(item.endDate);
            expect(endDate.getTime()).not.toBeNaN();
          }
        }
      });
    });
  });

  describe('myStack section validation', () => {
    it('should have correct structure', () => {
      expect(appConfig.myStack).toHaveProperty('blocks');
      expect(Array.isArray(appConfig.myStack.blocks)).toBe(true);
    });

    it('should not have additional properties', () => {
      const expectedKeys = ['blocks'];
      const actualKeys = Object.keys(appConfig.myStack);
      expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      expect(actualKeys).toHaveLength(expectedKeys.length);
    });

    describe('blocks array validation', () => {
      it('should not be empty', () => {
        expect(appConfig.myStack.blocks).toHaveLength(EXPECTED_BLOCKS_COUNT);
      });

      it('should have valid block items', () => {
        for (const block of appConfig.myStack.blocks) {
          expect(block).toHaveProperty('title');
          expect(block).toHaveProperty('items');

          expect(typeof block.title).toBe('string');
          expect(Array.isArray(block.items)).toBe(true);

          expect(block.title.length).toBeGreaterThan(0);
          expect(block.items.length).toBeGreaterThan(0);
        }
      });

      it('should have valid items in each block', () => {
        for (const block of appConfig.myStack.blocks) {
          for (const item of block.items) {
            expect(typeof item).toBe('string');
            expect(item.length).toBeGreaterThan(0);
          }
        }
      });

      it('should have unique titles', () => {
        const titles = appConfig.myStack.blocks.map((block) => block.title);
        const uniqueTitles = new Set(titles);
        expect(uniqueTitles.size).toBe(titles.length);
      });

      it('should have expected block titles', () => {
        const expectedTitles = [
          'frontend',
          'backend',
          'database',
          'test',
          'tools',
        ];
        const actualTitles = appConfig.myStack.blocks.map(
          (block) => block.title
        );
        expect(actualTitles).toEqual(expect.arrayContaining(expectedTitles));
      });
    });
  });

  describe('myContacts section validation', () => {
    it('should have correct structure', () => {
      expect(appConfig.myContacts).toHaveProperty('contacts');
      expect(Array.isArray(appConfig.myContacts.contacts)).toBe(true);
    });

    it('should not have additional properties', () => {
      const expectedKeys = ['contacts'];
      const actualKeys = Object.keys(appConfig.myContacts);
      expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys));
      expect(actualKeys).toHaveLength(expectedKeys.length);
    });

    describe('contacts array validation', () => {
      it('should not be empty', () => {
        expect(appConfig.myContacts.contacts).toHaveLength(
          EXPECTED_CONTACTS_COUNT
        );
      });

      it('should have valid contact items', () => {
        for (const contact of appConfig.myContacts.contacts) {
          expect(contact).toHaveProperty('code');
          expect(contact).toHaveProperty('name');

          expect(typeof contact.code).toBe('string');
          expect(typeof contact.name).toBe('string');

          expect(contact.code.length).toBeGreaterThan(0);
          expect(contact.name.length).toBeGreaterThan(0);
        }
      });

      it('should have valid optional properties', () => {
        for (const contact of appConfig.myContacts.contacts) {
          if (contact.url) {
            expect(typeof contact.url).toBe('string');
            expect(contact.url.length).toBeGreaterThan(0);
          }

          if (contact.copyValue) {
            expect(typeof contact.copyValue).toBe('string');
            expect(contact.copyValue.length).toBeGreaterThan(0);
          }
        }
      });

      it('should have unique names', () => {
        const names = appConfig.myContacts.contacts.map(
          (contact) => contact.name
        );
        const uniqueNames = new Set(names);
        expect(uniqueNames.size).toBe(names.length);
      });

      it('should have expected contact types', () => {
        const expectedNames = [
          'telegram',
          'linkedin',
          'github',
          'phone',
          'email',
        ];
        const actualNames = appConfig.myContacts.contacts.map(
          (contact) => contact.name
        );
        expect(actualNames).toEqual(expect.arrayContaining(expectedNames));
      });

      it('should have valid URLs when present', () => {
        for (const contact of appConfig.myContacts.contacts) {
          if (contact.url) {
            try {
              new URL(contact.url);
            } catch {
              throw new Error(`Invalid URL: ${contact.url}`);
            }
          }
        }
      });
    });
  });

  describe('Data consistency validation', () => {
    it('should have consistent data across sections', () => {
      expect(appConfig.aboutMe.years).toBe(EXPECTED_ABOUT_ME_YEARS);
      expect(appConfig.aboutMe.hours).toBe(EXPECTED_ABOUT_ME_HOURS);
      expect(appConfig.aboutMe.projectCount).toBe(
        EXPECTED_ABOUT_ME_PROJECT_COUNT
      );
    });

    it('should have experience items in chronological order', () => {
      const experiences = appConfig.myExperience?.experience;
      if (!experiences) {
        return;
      }

      for (let i = 0; i < experiences.length - 1; i++) {
        const currentStart = new Date(experiences[i]?.startDate || '');
        const nextStart = new Date(experiences[i + 1]?.startDate || '');
        expect(currentStart.getTime()).toBeGreaterThanOrEqual(
          nextStart.getTime()
        );
      }
    });
  });
});
