DROP TABLE IF EXISTS msgs;
CREATE TABLE IF NOT EXISTS msgs (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	sms_date VARCHAR NOT NULL,
	sms_from VARCHAR NOT NULL,
	sms_text VARCHAR NOT NULL
);
INSERT INTO msgs (sms_date, sms_from, sms_text) VALUES ('2021', '+1234567890', 'Hello, World!'), ('2022', '+0987654321', 'Goodbye, World!');
