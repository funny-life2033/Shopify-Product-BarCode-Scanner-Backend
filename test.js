const entities = [
  {
    uuid: "53b00326-7dbb-4990-83bb-27b593892d01",
    properties: {
      name: "Ryan Precious",
      identifier: {
        entity_def_id: "contact",
        uuid: "53b00326-7dbb-4990-83bb-27b593892d01",
        value: "Ryan Precious",
      },
      linkedin: "ryan-precious-2aba5726",
      job_levels: ["l_400_vp"],
      job_departments: ["sales"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "f7618ca2-04bb-4b75-9adb-d7c45adc2b91",
            related_uuid: "53b00326-7dbb-4990-83bb-27b593892d01",
            properties: {
              identifier: {
                uuid: "f7618ca2-04bb-4b75-9adb-d7c45adc2b91",
                value: "Ryan Precious",
                entity_def_id: "contact_item",
              },
              job_title: "Vice President, Worldwide Sales",
              source_type: "leadspace",
              hashes: {
                work_emails: ["3ba1e742698224490c46b2639749a74d"],
                work_phones: ["ea6d3422100d308ae46474677e679eb4"],
                multi_field_confidences: {
                  "3ba1e742698224490c46b2639749a74d": "conf_300_unknown",
                  ea6d3422100d308ae46474677e679eb4: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "dd2ca2c0-6da7-47d3-a30f-55c6ac47df1e",
            related_uuid: "53b00326-7dbb-4990-83bb-27b593892d01",
            properties: {
              identifier: {
                uuid: "dd2ca2c0-6da7-47d3-a30f-55c6ac47df1e",
                value: "Rockset",
                image_id: "hhaansdbd30v0sskopng",
                permalink: "rockset",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "99c5404c-0ff5-8ee5-d334-4b944ddb8cd9",
                  value: "Analytics",
                  permalink: "analytics",
                  entity_def_id: "category",
                },
                {
                  uuid: "c4d8caf3-5fe7-359b-f9f2-2d708378e4ee",
                  value: "Artificial Intelligence (AI)",
                  permalink: "artificial-intelligence",
                  entity_def_id: "category",
                },
                {
                  uuid: "f579213a-60af-8bb3-309b-1d80607ad2a9",
                  value: "Information Services",
                  permalink: "information-services-f579",
                  entity_def_id: "category",
                },
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "38414ea0-e8b8-a6c0-946e-23052c658c88",
                  value: "San Mateo",
                  permalink: "san-mateo-california",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "eb879a83-c91a-121e-0bb8-829782dbcf04",
                  value: "California",
                  permalink: "california-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 70,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "ba865ae1-1979-46a7-8bea-8a9ca87d81cd",
    properties: {
      name: "Maurina ️",
      identifier: {
        entity_def_id: "contact",
        uuid: "ba865ae1-1979-46a7-8bea-8a9ca87d81cd",
        value: "Maurina ️",
      },
      linkedin: "maurinaventurelli",
      job_levels: ["l_400_vp"],
      job_departments: ["marketing"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "d109aaec-fc61-45e3-9fc1-b6c5f3f90d0c",
            related_uuid: "ba865ae1-1979-46a7-8bea-8a9ca87d81cd",
            properties: {
              identifier: {
                uuid: "d109aaec-fc61-45e3-9fc1-b6c5f3f90d0c",
                value: "Maurina ️",
                entity_def_id: "contact_item",
              },
              job_title: "Vice President Marketing",
              source_type: "leadspace",
              hashes: {
                work_phones: ["cc2fbab50917183a3b3c740a1265f4da"],
                personal_emails: ["37e1b41e1e9f6281017a6f8e32c508b6"],
                multi_field_confidences: {
                  "37e1b41e1e9f6281017a6f8e32c508b6": "conf_300_unknown",
                  cc2fbab50917183a3b3c740a1265f4da: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "dd2ca2c0-6da7-47d3-a30f-55c6ac47df1e",
            related_uuid: "ba865ae1-1979-46a7-8bea-8a9ca87d81cd",
            properties: {
              identifier: {
                uuid: "dd2ca2c0-6da7-47d3-a30f-55c6ac47df1e",
                value: "Rockset",
                image_id: "hhaansdbd30v0sskopng",
                permalink: "rockset",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "99c5404c-0ff5-8ee5-d334-4b944ddb8cd9",
                  value: "Analytics",
                  permalink: "analytics",
                  entity_def_id: "category",
                },
                {
                  uuid: "c4d8caf3-5fe7-359b-f9f2-2d708378e4ee",
                  value: "Artificial Intelligence (AI)",
                  permalink: "artificial-intelligence",
                  entity_def_id: "category",
                },
                {
                  uuid: "f579213a-60af-8bb3-309b-1d80607ad2a9",
                  value: "Information Services",
                  permalink: "information-services-f579",
                  entity_def_id: "category",
                },
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "38414ea0-e8b8-a6c0-946e-23052c658c88",
                  value: "San Mateo",
                  permalink: "san-mateo-california",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "eb879a83-c91a-121e-0bb8-829782dbcf04",
                  value: "California",
                  permalink: "california-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 70,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "2c366c87-968b-464e-a397-d6ee5ae5975b",
    properties: {
      name: "Jeff Herd",
      identifier: {
        entity_def_id: "contact",
        uuid: "2c366c87-968b-464e-a397-d6ee5ae5975b",
        value: "Jeff Herd",
      },
      linkedin: "jeff-herd",
      job_levels: ["l_400_vp"],
      job_departments: ["sales"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "76493a41-6175-4cce-8f6c-c9061d3aa6f9",
            related_uuid: "2c366c87-968b-464e-a397-d6ee5ae5975b",
            properties: {
              identifier: {
                uuid: "76493a41-6175-4cce-8f6c-c9061d3aa6f9",
                value: "Jeff Herd",
                entity_def_id: "contact_item",
              },
              job_title: "VP of Sales",
              source_type: "lead411",
              hashes: {
                work_emails: ["a8bb900653281114a76de440548013c0"],
                personal_phones: ["8a5da38a5d7ebae6ad318c208ebd4937"],
                multi_field_confidences: {
                  "8a5da38a5d7ebae6ad318c208ebd4937": "conf_300_unknown",
                  a8bb900653281114a76de440548013c0: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "0cb16879-3feb-6e05-87da-4635e34d8a87",
            related_uuid: "2c366c87-968b-464e-a397-d6ee5ae5975b",
            properties: {
              identifier: {
                uuid: "0cb16879-3feb-6e05-87da-4635e34d8a87",
                value: "CareAcademy",
                image_id: "v1417424257/bgq56bti8dt2ne8omvu7.png",
                permalink: "care-academy",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "025caab7-3e54-98f0-061c-73e7af159cd1",
                  value: "Education",
                  permalink: "education",
                  entity_def_id: "category",
                },
                {
                  uuid: "3f21415b-5784-6be6-3722-eb189190b7cd",
                  value: "Health Care",
                  permalink: "health-care",
                  entity_def_id: "category",
                },
                {
                  uuid: "fdce94bf-c29d-00bd-2925-9c07fa487243",
                  value: "Home Health Care",
                  permalink: "home-health-care",
                  entity_def_id: "category",
                },
                {
                  uuid: "5c4e6926-5ff7-b188-0892-c8eb036c5ace",
                  value: "SaaS",
                  permalink: "saas-5c4e",
                  entity_def_id: "category",
                },
                {
                  uuid: "e55f09e8-697b-1653-f86e-0274d25d6db6",
                  value: "Training",
                  permalink: "training",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "46d953ab-bf0c-0fd1-c375-f151b78542a0",
                  value: "Cambridge",
                  permalink: "cambridge-massachusetts",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "98c62fd9-2148-9dd7-d767-b27fa0816b97",
                  value: "Massachusetts",
                  permalink: "massachusetts-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 59,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "971ff58e-92de-4860-9039-b8c4f5c4cec6",
    properties: {
      name: "Andy Bown",
      identifier: {
        entity_def_id: "contact",
        uuid: "971ff58e-92de-4860-9039-b8c4f5c4cec6",
        value: "Andy Bown",
      },
      linkedin: "bown-andy",
      job_levels: ["l_400_vp"],
      job_departments: ["sales"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "d69775a5-9919-48a1-99b2-0486584d1fe1",
            related_uuid: "971ff58e-92de-4860-9039-b8c4f5c4cec6",
            properties: {
              identifier: {
                uuid: "d69775a5-9919-48a1-99b2-0486584d1fe1",
                value: "Andy Bown",
                entity_def_id: "contact_item",
              },
              job_title: "VP, Head of Sales",
              source_type: "lead411",
              hashes: {
                work_emails: ["fb22ee27593e6249e2ecae3c7da1d91c"],
                personal_phones: ["77bb0cae7779fe76f11ee394f4afe892"],
                multi_field_confidences: {
                  "77bb0cae7779fe76f11ee394f4afe892": "conf_300_unknown",
                  fb22ee27593e6249e2ecae3c7da1d91c: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "c984f97b-5461-4bde-b21f-0d2760f5b0f2",
            related_uuid: "971ff58e-92de-4860-9039-b8c4f5c4cec6",
            properties: {
              identifier: {
                uuid: "c984f97b-5461-4bde-b21f-0d2760f5b0f2",
                value: "Cosm",
                image_id: "34a079e3811a4e2fb90f626f3fd786dd",
                permalink: "cosm",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "3ab64b42-61dc-08a5-cfe3-a25127ae3eea",
                  value: "Content",
                  permalink: "content",
                  entity_def_id: "category",
                },
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "78b58810-ad58-a623-2a80-2a0e3603a544",
                  value: "Media and Entertainment",
                  permalink: "media-and-entertainment",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
                {
                  uuid: "c6adf822-7fa3-c0b3-5188-556e08d72128",
                  value: "Video",
                  permalink: "video",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "4ce61f42-f6c4-e7ec-798d-44813b58856b",
                  value: "Los Angeles",
                  permalink: "los-angeles-california",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "eb879a83-c91a-121e-0bb8-829782dbcf04",
                  value: "California",
                  permalink: "california-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 118,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "cdc3a6bb-440f-4131-b366-5e6d52a6dfea",
    properties: {
      name: "TJ Rowe",
      identifier: {
        entity_def_id: "contact",
        uuid: "cdc3a6bb-440f-4131-b366-5e6d52a6dfea",
        value: "TJ Rowe",
      },
      linkedin: "tj-rowe-06b6371a1",
      job_levels: ["l_100_individual"],
      job_departments: ["sales"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "c800f961-3892-4971-8f49-67425a14025c",
            related_uuid: "cdc3a6bb-440f-4131-b366-5e6d52a6dfea",
            properties: {
              identifier: {
                uuid: "c800f961-3892-4971-8f49-67425a14025c",
                value: "TJ Rowe",
                entity_def_id: "contact_item",
              },
              job_title: "VP of Sales",
              source_type: "leadspace",
              hashes: {
                personal_emails: ["b42f10d50c88319a536d63b6d992e722"],
                multi_field_confidences: {
                  b42f10d50c88319a536d63b6d992e722: "conf_100_high",
                },
              },
              canonical_job_priority: 100,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "d313b39d-1e23-4f98-af1c-db69eb369c12",
            related_uuid: "cdc3a6bb-440f-4131-b366-5e6d52a6dfea",
            properties: {
              identifier: {
                uuid: "d313b39d-1e23-4f98-af1c-db69eb369c12",
                value: "Second Front Systems",
                image_id: "g1tv9nwgkadeka4ziyvf",
                permalink: "second-front-systems",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "f579213a-60af-8bb3-309b-1d80607ad2a9",
                  value: "Information Services",
                  permalink: "information-services-f579",
                  entity_def_id: "category",
                },
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "a477d733-6770-63f6-8b37-9444379e3186",
                  value: "National Security",
                  permalink: "national-security",
                  entity_def_id: "category",
                },
                {
                  uuid: "5c4e6926-5ff7-b188-0892-c8eb036c5ace",
                  value: "SaaS",
                  permalink: "saas-5c4e",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "f0df5079-0e0f-0701-d1cf-da245a61f217",
                  value: "Wilmington",
                  permalink: "wilmington-delaware",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "80757580-5d44-1e11-b8b7-470ff238abe2",
                  value: "Delaware",
                  permalink: "delaware-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 50,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "4cece4d8-1dfd-4c48-a301-1ec94c47afbc",
    properties: {
      name: "Laleh Hassibi",
      identifier: {
        entity_def_id: "contact",
        uuid: "4cece4d8-1dfd-4c48-a301-1ec94c47afbc",
        value: "Laleh Hassibi",
      },
      linkedin: "lalehfarrah",
      job_levels: ["l_400_vp"],
      job_departments: ["marketing"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "1ef28c05-f280-4a27-bf3f-6e6c6a2a6ee4",
            related_uuid: "4cece4d8-1dfd-4c48-a301-1ec94c47afbc",
            properties: {
              identifier: {
                uuid: "1ef28c05-f280-4a27-bf3f-6e6c6a2a6ee4",
                value: "Laleh Hassibi",
                entity_def_id: "contact_item",
              },
              job_title: "Vice President Marketing",
              source_type: "lead411",
              hashes: {
                personal_phones: ["ca8887f47de516e8d35f69f9fca14c4d"],
                multi_field_confidences: {
                  ca8887f47de516e8d35f69f9fca14c4d: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "74a2ecb3-c8ab-4dd5-927d-c50c98525b20",
            related_uuid: "4cece4d8-1dfd-4c48-a301-1ec94c47afbc",
            properties: {
              identifier: {
                uuid: "74a2ecb3-c8ab-4dd5-927d-c50c98525b20",
                value: "Lexion",
                image_id: "nvig7t9yixpx72zoea6a",
                permalink: "lexion",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "c4d8caf3-5fe7-359b-f9f2-2d708378e4ee",
                  value: "Artificial Intelligence (AI)",
                  permalink: "artificial-intelligence",
                  entity_def_id: "category",
                },
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "24c09530-c94b-258f-2e77-10aaa0bfe87e",
                  value: "Procurement",
                  permalink: "procurement",
                  entity_def_id: "category",
                },
                {
                  uuid: "f55dc7f6-6a38-750c-333b-c265f3761fe1",
                  value: "Productivity Tools",
                  permalink: "productivity-tools",
                  entity_def_id: "category",
                },
                {
                  uuid: "5c4e6926-5ff7-b188-0892-c8eb036c5ace",
                  value: "SaaS",
                  permalink: "saas-5c4e",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "d3d40838-4bbb-b094-3865-6c4cf9970090",
                  value: "Seattle",
                  permalink: "seattle-washington",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "86caa7e0-91fb-ce58-6e4c-d58e799dd2bd",
                  value: "Washington",
                  permalink: "washington-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 65,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "1b27f772-6f77-474f-ae36-1277942fde57",
    properties: {
      name: "Laura Reigel",
      identifier: {
        entity_def_id: "contact",
        uuid: "1b27f772-6f77-474f-ae36-1277942fde57",
        value: "Laura Reigel",
      },
      linkedin: "lreigel",
      job_levels: ["l_400_vp"],
      job_departments: ["marketing"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "a77ee9fe-3d53-44b5-b09b-680255a078af",
            related_uuid: "1b27f772-6f77-474f-ae36-1277942fde57",
            properties: {
              identifier: {
                uuid: "a77ee9fe-3d53-44b5-b09b-680255a078af",
                value: "Laura Reigel",
                entity_def_id: "contact_item",
              },
              job_title: "VP of Marketing",
              source_type: "lead411",
              hashes: {
                personal_phones: ["a09f9c721b22abf97f27ee2486f63d87"],
                multi_field_confidences: {
                  a09f9c721b22abf97f27ee2486f63d87: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "74a2ecb3-c8ab-4dd5-927d-c50c98525b20",
            related_uuid: "1b27f772-6f77-474f-ae36-1277942fde57",
            properties: {
              identifier: {
                uuid: "74a2ecb3-c8ab-4dd5-927d-c50c98525b20",
                value: "Lexion",
                image_id: "nvig7t9yixpx72zoea6a",
                permalink: "lexion",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "c4d8caf3-5fe7-359b-f9f2-2d708378e4ee",
                  value: "Artificial Intelligence (AI)",
                  permalink: "artificial-intelligence",
                  entity_def_id: "category",
                },
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "24c09530-c94b-258f-2e77-10aaa0bfe87e",
                  value: "Procurement",
                  permalink: "procurement",
                  entity_def_id: "category",
                },
                {
                  uuid: "f55dc7f6-6a38-750c-333b-c265f3761fe1",
                  value: "Productivity Tools",
                  permalink: "productivity-tools",
                  entity_def_id: "category",
                },
                {
                  uuid: "5c4e6926-5ff7-b188-0892-c8eb036c5ace",
                  value: "SaaS",
                  permalink: "saas-5c4e",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "d3d40838-4bbb-b094-3865-6c4cf9970090",
                  value: "Seattle",
                  permalink: "seattle-washington",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "86caa7e0-91fb-ce58-6e4c-d58e799dd2bd",
                  value: "Washington",
                  permalink: "washington-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 65,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "9e0f18c4-022c-48a9-86bd-c5919e71b891",
    properties: {
      name: "Gary Pica",
      identifier: {
        entity_def_id: "contact",
        uuid: "9e0f18c4-022c-48a9-86bd-c5919e71b891",
        value: "Gary Pica",
      },
      linkedin: "garypicajr",
      job_levels: ["l_400_vp"],
      job_departments: ["marketing"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "ef1e8242-af6c-46ee-9392-8ebbcdf91d3a",
            related_uuid: "9e0f18c4-022c-48a9-86bd-c5919e71b891",
            properties: {
              identifier: {
                uuid: "ef1e8242-af6c-46ee-9392-8ebbcdf91d3a",
                value: "Gary Pica",
                entity_def_id: "contact_item",
              },
              job_title: "VP, Marketing",
              source_type: "lead411",
              hashes: {
                work_emails: ["474ce1e6bb278bb04706ed0ccc38a641"],
                personal_phones: ["a47ab575abeb23a8952cd138b4e90d61"],
                multi_field_confidences: {
                  "474ce1e6bb278bb04706ed0ccc38a641": "conf_300_unknown",
                  a47ab575abeb23a8952cd138b4e90d61: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "3441fb4f-426c-43df-9999-2adaef75a205",
            related_uuid: "9e0f18c4-022c-48a9-86bd-c5919e71b891",
            properties: {
              identifier: {
                uuid: "3441fb4f-426c-43df-9999-2adaef75a205",
                value: "Rewst",
                image_id: "ay9eqcnmwxyr1n4wqb16",
                permalink: "rewst",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "9f7f7dc0-e902-492f-b627-08c19590ad48",
                  value: "Robotic Process Automation (RPA)",
                  permalink: "rpa-c4f8",
                  entity_def_id: "category",
                },
                {
                  uuid: "421943ef-50ae-c811-470e-c66a0323cf0d",
                  value: "Robotics",
                  permalink: "robotics",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "4b40a6c6-a7cd-0cd9-02b3-97f6be89d7cb",
                  value: "Tampa",
                  permalink: "tampa-florida",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "7d27a740-1eba-06ba-8941-078f0789d387",
                  value: "Florida",
                  permalink: "florida-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00011_00050",
              num_contacts: 39,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "bba97561-66cf-4d31-9210-1fe09c8bb836",
    properties: {
      name: "William Descent",
      identifier: {
        entity_def_id: "contact",
        uuid: "bba97561-66cf-4d31-9210-1fe09c8bb836",
        value: "William Descent",
      },
      linkedin: "william-descent-91822b126",
      job_levels: ["l_100_individual", "l_400_vp"],
      job_departments: ["management"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "9edd9be1-af6e-4bae-b5bd-9e27bfbaaddf",
            related_uuid: "bba97561-66cf-4d31-9210-1fe09c8bb836",
            properties: {
              identifier: {
                uuid: "9edd9be1-af6e-4bae-b5bd-9e27bfbaaddf",
                value: "William Descent",
                entity_def_id: "contact_item",
              },
              job_title: "Vice President; Sales",
              source_type: "lead411",
              hashes: {
                personal_phones: ["875d2e5446a50de030dd36e4badb14fb"],
                multi_field_confidences: {
                  "875d2e5446a50de030dd36e4badb14fb": "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
          {
            uuid: "a6228609-4f72-4ff3-850f-821521e7422f",
            related_uuid: "bba97561-66cf-4d31-9210-1fe09c8bb836",
            properties: {
              identifier: {
                uuid: "a6228609-4f72-4ff3-850f-821521e7422f",
                value: "William Descent",
                entity_def_id: "contact_item",
              },
              job_title: "Sales and Support",
              source_type: "livedata",
              hashes: {
                personal_emails: ["36f97316e872f2092a4356709f7452d2"],
                multi_field_confidences: {
                  "36f97316e872f2092a4356709f7452d2": "conf_300_unknown",
                },
              },
              canonical_job_priority: 100,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "3441fb4f-426c-43df-9999-2adaef75a205",
            related_uuid: "bba97561-66cf-4d31-9210-1fe09c8bb836",
            properties: {
              identifier: {
                uuid: "3441fb4f-426c-43df-9999-2adaef75a205",
                value: "Rewst",
                image_id: "ay9eqcnmwxyr1n4wqb16",
                permalink: "rewst",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "9f7f7dc0-e902-492f-b627-08c19590ad48",
                  value: "Robotic Process Automation (RPA)",
                  permalink: "rpa-c4f8",
                  entity_def_id: "category",
                },
                {
                  uuid: "421943ef-50ae-c811-470e-c66a0323cf0d",
                  value: "Robotics",
                  permalink: "robotics",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "4b40a6c6-a7cd-0cd9-02b3-97f6be89d7cb",
                  value: "Tampa",
                  permalink: "tampa-florida",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "7d27a740-1eba-06ba-8941-078f0789d387",
                  value: "Florida",
                  permalink: "florida-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00011_00050",
              num_contacts: 39,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "b92255d0-3471-43d0-8f58-ed6a1b76a176",
    properties: {
      name: "Dave Woodward",
      identifier: {
        entity_def_id: "contact",
        uuid: "b92255d0-3471-43d0-8f58-ed6a1b76a176",
        value: "Dave Woodward",
      },
      linkedin: "woodwarddave",
      job_levels: ["l_100_individual", "l_400_vp"],
      job_departments: ["sales"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "80768752-7c72-47d1-8343-b63458dbcd0e",
            related_uuid: "b92255d0-3471-43d0-8f58-ed6a1b76a176",
            properties: {
              identifier: {
                uuid: "80768752-7c72-47d1-8343-b63458dbcd0e",
                value: "Dave Woodward",
                entity_def_id: "contact_item",
              },
              job_title: "Vice President of Global Sales",
              source_type: "lead411",
              hashes: {
                work_emails: ["d057b6f8e1be29d9bd3000a81fc12b5d"],
                multi_field_confidences: {
                  d057b6f8e1be29d9bd3000a81fc12b5d: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
          {
            uuid: "a398d8bf-d494-4c2b-93f9-6c8dca23ac4b",
            related_uuid: "b92255d0-3471-43d0-8f58-ed6a1b76a176",
            properties: {
              identifier: {
                uuid: "a398d8bf-d494-4c2b-93f9-6c8dca23ac4b",
                value: "David Woodward",
                entity_def_id: "contact_item",
              },
              job_title: "Sales and Support",
              source_type: "livedata",
              hashes: {
                personal_emails: ["d057b6f8e1be29d9bd3000a81fc12b5d"],
                multi_field_confidences: {
                  d057b6f8e1be29d9bd3000a81fc12b5d: "conf_300_unknown",
                },
              },
              canonical_job_priority: 100,
            },
          },
          {
            uuid: "ab31ad0d-6dd6-44f8-af0d-a86fbd702c3c",
            related_uuid: "b92255d0-3471-43d0-8f58-ed6a1b76a176",
            properties: {
              identifier: {
                uuid: "ab31ad0d-6dd6-44f8-af0d-a86fbd702c3c",
                value: "Dave Woodward",
                entity_def_id: "contact_item",
              },
              job_title: "Vice President of Global Sales & Channels",
              source_type: "leadspace",
              hashes: {
                work_phones: ["e1a3a2d7104d5ac971ad5270bf15829c"],
                personal_emails: ["d057b6f8e1be29d9bd3000a81fc12b5d"],
                multi_field_confidences: {
                  d057b6f8e1be29d9bd3000a81fc12b5d: "conf_100_high",
                  e1a3a2d7104d5ac971ad5270bf15829c: "conf_100_high",
                },
              },
              canonical_job_priority: 100,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "bfbee7bd-bcad-48df-adbd-5b05f1dca770",
            related_uuid: "b92255d0-3471-43d0-8f58-ed6a1b76a176",
            properties: {
              identifier: {
                uuid: "bfbee7bd-bcad-48df-adbd-5b05f1dca770",
                value: "Axiad",
                image_id: "k3xr0fjknici4ppwb3bt",
                permalink: "axiad-ids-inc",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "46c250d5-00f6-d12f-4ad8-9b16f8b233d4",
                  value: "Cyber Security",
                  permalink: "cyber-security",
                  entity_def_id: "category",
                },
                {
                  uuid: "24c5db84-02a2-6040-49cf-4314b287674f",
                  value: "Identity Management",
                  permalink: "identity-management",
                  entity_def_id: "category",
                },
                {
                  uuid: "05ce5995-19d0-7c15-f4c7-19fb5c641c33",
                  value: "Network Security",
                  permalink: "network-security",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "3fce50c4-f3f9-793d-2f50-3fc145585090",
                  value: "Santa Clara",
                  permalink: "santa-clara-california",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "eb879a83-c91a-121e-0bb8-829782dbcf04",
                  value: "California",
                  permalink: "california-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 54,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "80735ef0-9cc4-4d5c-af92-446bf840a02f",
    properties: {
      name: "Ben Virdee-Chapman",
      identifier: {
        entity_def_id: "contact",
        uuid: "80735ef0-9cc4-4d5c-af92-446bf840a02f",
        value: "Ben Virdee-Chapman",
      },
      linkedin: "benvirdeechapman",
      job_levels: ["l_400_vp"],
      job_departments: ["marketing"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "c7c37fca-bee1-40a1-8f79-e7e0d29a1af1",
            related_uuid: "80735ef0-9cc4-4d5c-af92-446bf840a02f",
            properties: {
              identifier: {
                uuid: "c7c37fca-bee1-40a1-8f79-e7e0d29a1af1",
                value: "Ben Virdee-Chapman",
                entity_def_id: "contact_item",
              },
              job_title: "VP of Marketing",
              source_type: "lead411",
              hashes: {
                personal_phones: ["916fdf59ca4cb6926ad268d792e5ee5d"],
                multi_field_confidences: {
                  "916fdf59ca4cb6926ad268d792e5ee5d": "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "01cf3526-0a6c-505f-6e77-4c3bea2a6f19",
            related_uuid: "80735ef0-9cc4-4d5c-af92-446bf840a02f",
            properties: {
              identifier: {
                uuid: "01cf3526-0a6c-505f-6e77-4c3bea2a6f19",
                value: "Gig Wage",
                image_id: "vwgijucsxrighjxji5ps",
                permalink: "visage-payroll",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "14f97695-c4eb-c348-d373-5863c4b4798a",
                  value: "Employee Benefits",
                  permalink: "employee-benefits",
                  entity_def_id: "category",
                },
                {
                  uuid: "90b4194f-1d4f-ff5c-d7a6-6b6f32ae4892",
                  value: "Financial Services",
                  permalink: "financial-services",
                  entity_def_id: "category",
                },
                {
                  uuid: "e06799a9-f789-76e7-49a7-71ee980a70ec",
                  value: "FinTech",
                  permalink: "fintech-e067",
                  entity_def_id: "category",
                },
                {
                  uuid: "92deb86b-de05-53d4-e1f9-39658c12d2da",
                  value: "Human Resources",
                  permalink: "human-resources",
                  entity_def_id: "category",
                },
                {
                  uuid: "f6195c47-1e3b-4cce-5409-6ed62f94d43c",
                  value: "Payments",
                  permalink: "payments",
                  entity_def_id: "category",
                },
                {
                  uuid: "5c4e6926-5ff7-b188-0892-c8eb036c5ace",
                  value: "SaaS",
                  permalink: "saas-5c4e",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "4adc63ff-3d91-9598-74df-e37fff9553ec",
                  value: "Dallas",
                  permalink: "dallas-texas",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "54e9e76a-1847-d137-00a7-ed1aab624b78",
                  value: "Texas",
                  permalink: "texas-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00011_00050",
              num_contacts: 15,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "b6b41906-c85b-4631-8b63-8358c303394c",
    properties: {
      name: "Zachary Pitts",
      identifier: {
        entity_def_id: "contact",
        uuid: "b6b41906-c85b-4631-8b63-8358c303394c",
        value: "Zachary Pitts",
      },
      linkedin: "zacharypitts",
      job_levels: ["l_100_individual", "l_400_vp"],
      job_departments: ["operations", "sales"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "3360920f-285e-4966-89dd-25d2e907bec0",
            related_uuid: "b6b41906-c85b-4631-8b63-8358c303394c",
            properties: {
              identifier: {
                uuid: "3360920f-285e-4966-89dd-25d2e907bec0",
                value: "Zachary Pitts",
                entity_def_id: "contact_item",
              },
              job_title: "SVP of Sales",
              source_type: "leadspace",
              hashes: {
                personal_emails: ["83ffc1e6d8e02357a396ba7f8cbdf1f8"],
                multi_field_confidences: {
                  "83ffc1e6d8e02357a396ba7f8cbdf1f8": "conf_100_high",
                },
              },
              canonical_job_priority: 100,
            },
          },
          {
            uuid: "407a1af2-885f-40a1-8817-a3e777d613da",
            related_uuid: "b6b41906-c85b-4631-8b63-8358c303394c",
            properties: {
              identifier: {
                uuid: "407a1af2-885f-40a1-8817-a3e777d613da",
                value: "Zachary Pitts",
                entity_def_id: "contact_item",
              },
              job_title: "SVP of Sales",
              source_type: "livedata",
              hashes: {
                work_emails: ["83ffc1e6d8e02357a396ba7f8cbdf1f8"],
                personal_emails: ["c214490c8d82b52b4e5865ae334a1d21"],
                multi_field_confidences: {
                  "83ffc1e6d8e02357a396ba7f8cbdf1f8": "conf_300_unknown",
                  c214490c8d82b52b4e5865ae334a1d21: "conf_100_high",
                },
              },
              canonical_job_priority: 100,
            },
          },
          {
            uuid: "fd132add-4050-4141-aad7-f23c65744d60",
            related_uuid: "b6b41906-c85b-4631-8b63-8358c303394c",
            properties: {
              identifier: {
                uuid: "fd132add-4050-4141-aad7-f23c65744d60",
                value: "Zachary Pitts",
                entity_def_id: "contact_item",
              },
              job_title: "VP of Sales",
              source_type: "lead411",
              hashes: {
                work_emails: ["141c3fbf86ac0e630e248a6a49d52d0b"],
                multi_field_confidences: {
                  "141c3fbf86ac0e630e248a6a49d52d0b": "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "19334386-2b4a-e6f4-42a5-663e4dfb4a42",
            related_uuid: "b6b41906-c85b-4631-8b63-8358c303394c",
            properties: {
              identifier: {
                uuid: "19334386-2b4a-e6f4-42a5-663e4dfb4a42",
                value: "Neuro-ID",
                image_id: "cc2afe13565f45fead234555a6fc515c",
                permalink: "neuro-id",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "99c5404c-0ff5-8ee5-d334-4b944ddb8cd9",
                  value: "Analytics",
                  permalink: "analytics",
                  entity_def_id: "category",
                },
                {
                  uuid: "104eed8c-8bd5-5d13-e418-d698bf8a2bce",
                  value: "Fraud Detection",
                  permalink: "fraud-detection",
                  entity_def_id: "category",
                },
                {
                  uuid: "e33cac20-55b4-a943-e64a-7fc37a3d2ca3",
                  value: "InsurTech",
                  permalink: "insurtech",
                  entity_def_id: "category",
                },
                {
                  uuid: "e37ada49-ab15-5e46-0a49-f0ce1a3c9128",
                  value: "Neuroscience",
                  permalink: "neuroscience-e37a",
                  entity_def_id: "category",
                },
                {
                  uuid: "ca8390d7-22c6-5bb5-f870-22f52f364b1b",
                  value: "Predictive Analytics",
                  permalink: "predictive-analytics-ca83",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "dffa2e7e-11f4-1d38-d847-116ac26f0459",
                  value: "Whitefish",
                  permalink: "whitefish-montana",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "6dd14885-99b4-ac33-5d73-eba00c350776",
                  value: "Montana",
                  permalink: "montana-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 62,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "151f13d8-3341-41d8-9e0f-d2a2bd7a770a",
    properties: {
      name: "Rick Bilodeau",
      identifier: {
        entity_def_id: "contact",
        uuid: "151f13d8-3341-41d8-9e0f-d2a2bd7a770a",
        value: "Rick Bilodeau",
      },
      linkedin: "rickbilodeau",
      job_levels: ["l_100_individual"],
      job_departments: ["marketing"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "66046187-35fa-45ea-8136-534506daf83b",
            related_uuid: "151f13d8-3341-41d8-9e0f-d2a2bd7a770a",
            properties: {
              identifier: {
                uuid: "66046187-35fa-45ea-8136-534506daf83b",
                value: "Rick Bilodeau",
                entity_def_id: "contact_item",
              },
              job_title: "VP of Marketing",
              source_type: "leadspace",
              hashes: {
                personal_emails: ["ed9047d64928264ece4ac22a28ef3342"],
                multi_field_confidences: {
                  ed9047d64928264ece4ac22a28ef3342: "conf_100_high",
                },
              },
              canonical_job_priority: 100,
            },
          },
          {
            uuid: "77f01896-fabd-4e53-bdb3-72bee2f62f84",
            related_uuid: "151f13d8-3341-41d8-9e0f-d2a2bd7a770a",
            properties: {
              identifier: {
                uuid: "77f01896-fabd-4e53-bdb3-72bee2f62f84",
                value: "Rick Bilodeau",
                entity_def_id: "contact_item",
              },
              job_title: "Marketing and Product",
              source_type: "livedata",
              hashes: {
                personal_emails: ["056a0312f26931d14aec5a29e752e042"],
                multi_field_confidences: {
                  "056a0312f26931d14aec5a29e752e042": "conf_300_unknown",
                },
              },
              canonical_job_priority: 100,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "25f18dc3-dc70-4d2a-8fa5-ab43e0fc27aa",
            related_uuid: "151f13d8-3341-41d8-9e0f-d2a2bd7a770a",
            properties: {
              identifier: {
                uuid: "25f18dc3-dc70-4d2a-8fa5-ab43e0fc27aa",
                value: "Tabular",
                image_id: "c9v1zd5esrqyteii0yym",
                permalink: "tabular-technologies",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "99c5404c-0ff5-8ee5-d334-4b944ddb8cd9",
                  value: "Analytics",
                  permalink: "analytics",
                  entity_def_id: "category",
                },
                {
                  uuid: "7866a1c0-21ec-241c-c2a6-d263a6ef49dd",
                  value: "Cloud Computing",
                  permalink: "cloud-computing",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "1a36817c-b0a6-fbd1-a2be-3fb7e4900331",
                  value: "San Jose",
                  permalink: "san-jose-california",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "eb879a83-c91a-121e-0bb8-829782dbcf04",
                  value: "California",
                  permalink: "california-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00011_00050",
              num_contacts: 19,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "eb8c7d39-4e77-4164-9899-ca20731cd2b1",
    properties: {
      name: "Jeremy Powers",
      identifier: {
        entity_def_id: "contact",
        uuid: "eb8c7d39-4e77-4164-9899-ca20731cd2b1",
        value: "Jeremy Powers",
      },
      linkedin: "jeremypowers",
      job_levels: ["l_100_individual", "l_400_vp"],
      job_departments: ["management"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "47cdfafe-e156-4065-a6e3-19f727a6abb4",
            related_uuid: "eb8c7d39-4e77-4164-9899-ca20731cd2b1",
            properties: {
              identifier: {
                uuid: "47cdfafe-e156-4065-a6e3-19f727a6abb4",
                value: "Jeremy Powers",
                entity_def_id: "contact_item",
              },
              job_title: "Vice President of Sales & Partnerships",
              source_type: "lead411",
              hashes: {
                work_emails: ["ec4a3ab2f97ba40b4cd3d0961cf9db79"],
                personal_phones: ["a29050195c43a503e1dd6b002f630cae"],
                multi_field_confidences: {
                  a29050195c43a503e1dd6b002f630cae: "conf_300_unknown",
                  ec4a3ab2f97ba40b4cd3d0961cf9db79: "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
          {
            uuid: "f73ad4f8-141a-49e3-ac3f-b17fe3d48b7b",
            related_uuid: "eb8c7d39-4e77-4164-9899-ca20731cd2b1",
            properties: {
              identifier: {
                uuid: "f73ad4f8-141a-49e3-ac3f-b17fe3d48b7b",
                value: "Jeremy Powers",
                entity_def_id: "contact_item",
              },
              job_title: "Vice President of Sales & Partnerships",
              source_type: "livedata",
              hashes: {
                personal_emails: ["5e2f4e581d49b6a0d3e65c0c0dbf480a"],
                personal_phones: ["a29050195c43a503e1dd6b002f630cae"],
                multi_field_confidences: {
                  "5e2f4e581d49b6a0d3e65c0c0dbf480a": "conf_100_high",
                  a29050195c43a503e1dd6b002f630cae: "conf_300_unknown",
                },
              },
              canonical_job_priority: 100,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "1bba05c2-8686-43d1-afe9-9657a6985ba8",
            related_uuid: "eb8c7d39-4e77-4164-9899-ca20731cd2b1",
            properties: {
              identifier: {
                uuid: "1bba05c2-8686-43d1-afe9-9657a6985ba8",
                value: "Gretel",
                image_id: "xija3qizrfbfgjfbetel",
                permalink: "gretel-ai",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "c4d8caf3-5fe7-359b-f9f2-2d708378e4ee",
                  value: "Artificial Intelligence (AI)",
                  permalink: "artificial-intelligence",
                  entity_def_id: "category",
                },
                {
                  uuid: "26101f50-f176-4442-9e7f-bca955a63157",
                  value: "Data Collection and Labeling",
                  permalink: "data-collection-and-labeling",
                  entity_def_id: "category",
                },
                {
                  uuid: "8314a534-8f18-4ee0-869b-05bc6e46258e",
                  value: "Generative AI",
                  permalink: "generative-ai",
                  entity_def_id: "category",
                },
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "5ea0cdb7-c9a6-47fc-50f8-c9b0fac04863",
                  value: "Machine Learning",
                  permalink: "machine-learning",
                  entity_def_id: "category",
                },
                {
                  uuid: "e1a4665e-8b66-feda-2432-39e907eceb6d",
                  value: "Privacy",
                  permalink: "privacy-e1a4",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "5e6c0212-55e2-4524-d10e-b2c35a241086",
                  value: "San Diego",
                  permalink: "san-diego-california",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "eb879a83-c91a-121e-0bb8-829782dbcf04",
                  value: "California",
                  permalink: "california-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 55,
            },
          },
        ],
      },
    },
  },
  {
    uuid: "22fe6716-5b9c-453f-acee-efa42956fb25",
    properties: {
      name: "Maya Spivak",
      identifier: {
        entity_def_id: "contact",
        uuid: "22fe6716-5b9c-453f-acee-efa42956fb25",
        value: "Maya Spivak",
      },
      linkedin: "mayagrinbergspivak",
      job_levels: ["l_400_vp"],
      job_departments: ["marketing"],
    },
    related_entities: {
      "contact_item.has_contact_item.forward": {
        entities: [
          {
            uuid: "9b0b6d36-4a5d-453e-a496-12c05f77125c",
            related_uuid: "22fe6716-5b9c-453f-acee-efa42956fb25",
            properties: {
              identifier: {
                uuid: "9b0b6d36-4a5d-453e-a496-12c05f77125c",
                value: "Maya Grinberg",
                entity_def_id: "contact_item",
              },
              job_title: "VP of Marketing",
              source_type: "lead411",
              hashes: {
                work_emails: ["238ea693e7b5e2b9ce07f7349d82f80b"],
                work_phones: ["470c48b4346e59a336773a61f7514008"],
                personal_phones: ["4c7a99e02c6b75de33d179632ffa4c48"],
                multi_field_confidences: {
                  "238ea693e7b5e2b9ce07f7349d82f80b": "conf_300_unknown",
                  "470c48b4346e59a336773a61f7514008": "conf_300_unknown",
                  "4c7a99e02c6b75de33d179632ffa4c48": "conf_300_unknown",
                },
              },
              canonical_job_priority: 400,
            },
          },
        ],
      },
      "organization.org_has_contact.reverse": {
        entities: [
          {
            uuid: "1bba05c2-8686-43d1-afe9-9657a6985ba8",
            related_uuid: "22fe6716-5b9c-453f-acee-efa42956fb25",
            properties: {
              identifier: {
                uuid: "1bba05c2-8686-43d1-afe9-9657a6985ba8",
                value: "Gretel",
                image_id: "xija3qizrfbfgjfbetel",
                permalink: "gretel-ai",
                entity_def_id: "organization",
              },
              categories: [
                {
                  uuid: "c4d8caf3-5fe7-359b-f9f2-2d708378e4ee",
                  value: "Artificial Intelligence (AI)",
                  permalink: "artificial-intelligence",
                  entity_def_id: "category",
                },
                {
                  uuid: "26101f50-f176-4442-9e7f-bca955a63157",
                  value: "Data Collection and Labeling",
                  permalink: "data-collection-and-labeling",
                  entity_def_id: "category",
                },
                {
                  uuid: "8314a534-8f18-4ee0-869b-05bc6e46258e",
                  value: "Generative AI",
                  permalink: "generative-ai",
                  entity_def_id: "category",
                },
                {
                  uuid: "dbca89fa-f083-5438-b4ad-d3fdeceb78e7",
                  value: "Information Technology",
                  permalink: "information-technology-dbca",
                  entity_def_id: "category",
                },
                {
                  uuid: "5ea0cdb7-c9a6-47fc-50f8-c9b0fac04863",
                  value: "Machine Learning",
                  permalink: "machine-learning",
                  entity_def_id: "category",
                },
                {
                  uuid: "e1a4665e-8b66-feda-2432-39e907eceb6d",
                  value: "Privacy",
                  permalink: "privacy-e1a4",
                  entity_def_id: "category",
                },
                {
                  uuid: "c08b5441-a05b-9777-b7a6-012728caddd9",
                  value: "Software",
                  permalink: "software",
                  entity_def_id: "category",
                },
              ],
              location_identifiers: [
                {
                  uuid: "5e6c0212-55e2-4524-d10e-b2c35a241086",
                  value: "San Diego",
                  permalink: "san-diego-california",
                  entity_def_id: "location",
                  location_type: "city",
                },
                {
                  uuid: "eb879a83-c91a-121e-0bb8-829782dbcf04",
                  value: "California",
                  permalink: "california-united-states",
                  entity_def_id: "location",
                  location_type: "region",
                },
                {
                  uuid: "f110fca2-1055-99f6-996d-011c198b3928",
                  value: "United States",
                  permalink: "united-states",
                  entity_def_id: "location",
                  location_type: "country",
                },
                {
                  uuid: "b25caef9-a1b8-3a5d-6232-93b2dfb6a1d1",
                  value: "North America",
                  permalink: "north-america",
                  entity_def_id: "location",
                  location_type: "continent",
                },
              ],
              num_employees_enum: "c_00051_00100",
              num_contacts: 55,
            },
          },
        ],
      },
    },
  },
];

const info = entities.map((entity) => ({
  "Full Name": entity["properties"]["name"],
  "Job Title":
    entity["related_entities"]["contact_item.has_contact_item.forward"][
      "entities"
    ][0]["properties"]["job_title"],
  "LinkedIn Profile": entity["properties"]["linkedin"],
  "Company Name":
    entity["related_entities"]["organization.org_has_contact.reverse"][
      "entities"
    ][0]["properties"]["identifier"]["value"],
  Location: entity["related_entities"]["organization.org_has_contact.reverse"][
    "entities"
  ][0]["properties"]["location_identifiers"]
    .map((i) => i.value)
    .join(", "),
}));

console.log(JSON.stringify(info, null, 2));
