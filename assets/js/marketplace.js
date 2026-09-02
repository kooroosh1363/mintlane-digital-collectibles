export function formatPrice(value, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function filterAndSortWorks(works, { query = "", category = "all", sort = "featured" } = {}) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const result = works.filter((work) => {
    const matchesCategory = category === "all" || work.category === category;
    const searchable = `${work.title} ${work.artist} ${work.categoryLabel}`.toLocaleLowerCase();
    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
  });

  const sorters = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    title: (a, b) => a.title.localeCompare(b.title)
  };

  return sorters[sort] ? [...result].sort(sorters[sort]) : result;
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validateContact(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter at least 2 characters.";
  if (!isValidEmail(values.email)) errors.email = "Enter a valid email address.";
  if (!values.topic) errors.topic = "Choose a topic.";
  if (values.message.trim().length < 20) errors.message = "Enter at least 20 characters.";
  return errors;
}

export function uniqueRecent(ids, nextId, limit = 4) {
  return [nextId, ...ids.filter((id) => id !== nextId)].slice(0, limit);
}
