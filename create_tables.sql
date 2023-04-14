-- Table: public.actors
-- DROP TABLE IF EXISTS public.actors;
CREATE TABLE IF NOT EXISTS public.actors
(
    id integer NOT NULL DEFAULT 'nextval('actor_id_seq'::regclass)',
    name text COLLATE pg_catalog."default",
    CONSTRAINT actor_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.actors
    OWNER to postgres;


-- Table: public.movies
-- DROP TABLE IF EXISTS public.movies;
CREATE TABLE IF NOT EXISTS public.movies
(
    id integer NOT NULL DEFAULT 'nextval('movie_id_seq'::regclass)',
    title text COLLATE pg_catalog."default",
    year smallint,
    CONSTRAINT movie_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.movies
    OWNER to postgres;


-- Table: public.movies_actors
-- DROP TABLE IF EXISTS public.movies_actors;
CREATE TABLE IF NOT EXISTS public.movies_actors
(
    movie_id smallint NOT NULL,
    actor_id bigint NOT NULL,
    CONSTRAINT movie_actor_pkey PRIMARY KEY (movie_id, actor_id),
    CONSTRAINT actor FOREIGN KEY (actor_id)
        REFERENCES public.actors (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT movie FOREIGN KEY (movie_id)
        REFERENCES public.movies (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.movies_actors
    OWNER to postgres;