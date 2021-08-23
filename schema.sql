-- Table: public.category

-- DROP TABLE public.category;

CREATE TABLE public.category
(
    cat_id integer NOT NULL DEFAULT nextval('category_cat_id_seq'::regclass),
    cat_name character varying COLLATE pg_catalog."default",
    created_by character varying COLLATE pg_catalog."default",
    created_at time without time zone,
    CONSTRAINT category_pkey PRIMARY KEY (cat_id)
)

TABLESPACE pg_default;

ALTER TABLE public.category
    OWNER to postgres;



    -- Table: public.products

-- DROP TABLE public.products;

CREATE TABLE public.products
(
    pro_id integer NOT NULL DEFAULT nextval('products_pro_id_seq'::regclass),
    pro_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    description character varying(250) COLLATE pg_catalog."default" NOT NULL,
    cat_id integer NOT NULL,
    is_active boolean,
    created_by character varying(100) COLLATE pg_catalog."default",
    created_at date DEFAULT CURRENT_DATE,
    CONSTRAINT products_pkey PRIMARY KEY (pro_id),
    CONSTRAINT fk_cat_id FOREIGN KEY (cat_id)
        REFERENCES public.category (cat_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.products
    OWNER to postgres;



    -- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;