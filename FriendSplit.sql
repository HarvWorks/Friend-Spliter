SELECT * FROM friend_split.transactions;

INSERT INTO transactions (orginal_payer_id, ower_id, transaction, amount, amount_owed, created_at, updated_at) VALUES (1,1,'moo',1,1,now(),now()), (1,2,'moo',2,1,now(),now())